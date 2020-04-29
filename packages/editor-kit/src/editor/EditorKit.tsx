import React, {
  useContext,
  createContext,
  useMemo,
  useState,
  useEffect,
  useRef,
  Fragment,
  memo,
  useCallback,
} from "react";
import { createEditor as createSlateEditor, Transforms, Node } from "slate";
import { withReact, ReactEditor } from "slate-react";
import * as StylisDefault from "stylis";
import { Plugin } from "../plugins/Plugin";
import { DefaultThemePlugin } from "../features/theme/DefaultThemePlugin";
import { SelectionExtensionsPlugin } from "../features/selection/SelectionExtensionsPlugin";
import { IconProviderPlugin } from "../features/icons/IconProviderPlugin";
import { ConstraintsPlugin } from "../features/constraints/ConstraintsPlugin";
import { deleteBackward } from "./Editor";
import { LabelsPlugin } from "../features/i18n/LabelsPlugin";
import { useSpellcheck } from "../features/spellcheck/SpellCheck";
import { AutoFocusPlugin } from "../features/auto-focus/AutoFocusPlugin";
import { DeleteKeyHandlerPlugin } from "../features/delete-key/DeleteKeyHandlerPlugin";
import { EnterKeyHandlerPlugin } from "../features/enter-key/EnterKeyHandlerPlugin";

//Typings do not seem to match exported object :/
const Stylis: any = StylisDefault;

// These core plugins can be overriden (or disabled) by passing a plugin with the same "name"
// to <EditorKit plugins={...}/>
const InternalPlugins: Plugin[] = [
  DefaultThemePlugin,
  IconProviderPlugin,
  SelectionExtensionsPlugin,
  ConstraintsPlugin,
  LabelsPlugin,
  AutoFocusPlugin,
  DeleteKeyHandlerPlugin,
  EnterKeyHandlerPlugin,
];

export interface EditorKitValue {
  editor: ReactEditor;
  plugins: Plugin[];
  spellCheck: boolean;
  readOnly: boolean;
  disableReadOnly(): void;
  enableReadOnly(): void;
  render(): void;
  disableSpellCheck(): void;
  enableSpellCheck(): void;
  delaySpellCheck(): void;
  id: string;
}
const Context = createContext<EditorKitValue>({} as EditorKitValue);

export const useEditorKit = () => {
  return useContext(Context);
};

export interface EditorKitProps {
  children?: JSX.Element | JSX.Element[];
  plugins: Plugin[];
  spellCheck?: boolean;
  readOnly?: boolean;
  onEditor?(editor: ReactEditor): void;
  id?: string;
}

//Used for default IDs when props.id is undefined
let count = 1;

export const EditorKit = memo((props: EditorKitProps) => {
  const { children, onEditor } = props;
  const { current: id } = useRef(props.id || `editor${count++}`);
  const plugins = useMemo(() => getPlugins(props.plugins), [props.plugins]);
  const editor: ReactEditor = createEditor(plugins);
  const [, forceUpdate] = useState({});
  const [readOnly, setReadOnly] = useState(Boolean(props.readOnly));
  useEffect(() => {
    generateStyle(plugins, id);
  }, [props.plugins]);

  const render = useCallback((value = {}) => {
    forceUpdate(value);
  }, []);

  maybeConfigureTesting(editor, render);
  onEditor && onEditor(editor);

  const disableReadOnly = () => {
    setReadOnly(false);
  };

  const enableReadOnly = () => {
    setReadOnly(true);
  };

  const {
    spellCheck,
    disableSpellCheck,
    enableSpellCheck,
    delaySpellCheck,
  } = useSpellcheck(Boolean(props.spellCheck), id, render);

  //TODO remove this hack once workaround is found
  useEffect(() => {
    const { onChange } = editor;
    editor.onChange = () => {
      onChange();
      render();
    };
  }, []);

  const context = {
    editor,
    plugins,
    render,
    readOnly,
    disableReadOnly,
    enableReadOnly,
    spellCheck,
    disableSpellCheck,
    enableSpellCheck,
    delaySpellCheck,
    id,
  };

  return (
    <Context.Provider value={context}>
      <Fragment>{children}</Fragment>
    </Context.Provider>
  );
});

const getPlugins = (userPlugins: Plugin[]) => {
  return InternalPlugins.filter(
    (plugin) =>
      !userPlugins.find(
        (other) => Boolean(other.name) && other.name === plugin.name
      )
  )
    .concat(userPlugins)
    .sort((a, b) => {
      return (a.order || 0) - (b.order || 0);
    });
};

const createEditor = (plugins: Plugin[]): ReactEditor => {
  return useMemo(() => {
    let editor: ReactEditor = withReact(createSlateEditor());
    plugins.forEach((plugin: Plugin) => {
      if (plugin.withPlugin) {
        editor = plugin.withPlugin(editor);
      }
    });
    return editor;
  }, [plugins]);
};

const generateStyle = (plugins: Plugin[], id: string) => {
  const editorStyles: string[] = [];
  const globalStyles: string[] = [];

  plugins.forEach((plugin) => {
    if (plugin.editorStyles) {
      editorStyles.push(plugin.editorStyles());
    }
    if (plugin.globalStyles) {
      globalStyles.push(plugin.globalStyles());
    }
  });
  let editorStyle = "";
  if (editorStyles.length) {
    editorStyle = `
    #${id} {
      ${editorStyles.join("\n")}
    }`;
  }
  const globalStyle = globalStyles.join("\n");
  const css = Stylis.serialize(
    Stylis.compile(`${globalStyle} ${editorStyle}`),
    Stylis.stringify
  );
  attachEditorStyle(css, id);
};

const attachEditorStyle = (css: string, id: string) => {
  const linkElement = document.createElement("link");
  const styleId = `rek-styles-${id}`;
  const existing = document.getElementById(styleId);
  if (existing) {
    existing.parentElement?.removeChild(existing);
  }
  linkElement.id = styleId;
  linkElement.setAttribute("rel", "stylesheet");
  linkElement.setAttribute("type", "text/css");
  linkElement.setAttribute(
    "href",
    "data:text/css;charset=UTF-8," + encodeURIComponent(css)
  );
  document.head.appendChild(linkElement);
};

const maybeConfigureTesting = (editor: ReactEditor, forceUpdate: Function) => {
  if ((window as any).enableEditorKitOnGlobalScope) {
    const global: any = window;
    global.editor = editor;
    global.focusEditor = () => {
      ReactEditor.focus(editor);
    };
    global.blurEditor = () => {
      ReactEditor.blur(editor);
    };
    global.refreshEditor = () => forceUpdate({});

    global.setEditorValue = (value: Node[]) => {
      console.log(editor.children.slice());
      Transforms.removeNodes(editor, { at: [0] });
      Transforms.insertNodes(editor, value);
      console.log(value);
      console.log(editor.children.slice());
    };

    global.focusNode = (
      node: HTMLElement,
      point: "start" | "end" = "start"
    ) => {
      const slateNode = ReactEditor.toSlateNode(editor, node);
      if (slateNode) {
        Transforms.select(editor, ReactEditor.findPath(editor, slateNode));
      }
    };
    global.deleteBackward = (distance: number, unit: string = "character") => {
      deleteBackward(editor, distance, unit as any);
    };
  }
};
