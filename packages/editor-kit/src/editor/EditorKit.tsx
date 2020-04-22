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
import { createEditor as createSlateEditor, Transforms } from "slate";
import { withReact, ReactEditor } from "slate-react";
//import { glob } from "goober";
import { createGlobalStyle } from "styled-components";
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
  const Style = useRef<any>();
  useEffect(() => {
    Style.current = generateStyle(plugins);
  }, [props.plugins]);

  maybeConfigureTesting(editor, forceUpdate);
  onEditor && onEditor(editor);

  const disableReadOnly = () => {
    setReadOnly(false);
  };

  const enableReadOnly = () => {
    setReadOnly(true);
  };

  const render = useCallback(() => {
    forceUpdate({});
  }, []);

  const {
    spellCheck,
    disableSpellCheck,
    enableSpellCheck,
    delaySpellCheck,
  } = useSpellcheck(Boolean(props.spellCheck), id, render);

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
    <Fragment>
      {Style.current && <Style.current />}
      <Context.Provider value={context}>
        <Fragment>{children}</Fragment>
      </Context.Provider>
    </Fragment>
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
  }, []);
};

const generateStyle = (plugins: Plugin[]) => {
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
    [data-slate-editor=true] {
      ${editorStyles.join("\n")}
    }`;
  }
  console.log("Generate");
  const globalStyle = globalStyles.join("\n");

  return createGlobalStyle`${globalStyle} ${editorStyle}`;
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
    global.refreshEditor = () => forceUpdate();
    global.focusNode = (node: HTMLElement) => {
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
