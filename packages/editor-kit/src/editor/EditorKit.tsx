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
import { deleteBackward } from "./Editor";
import { createLabelsPlugin } from "../features/i18n/LabelsPlugin";
import { useSpellcheck } from "../features/spellcheck/SpellCheck";
import { AutoFocusPlugin } from "../features/auto-focus/AutoFocusPlugin";
import { BackspaceKeyPlugin } from "../features/backspace/BackspaceKeyPlugin";
import { EnterKeyPlugin } from "../features/enter/EnterKeyPlugin";
import { PluginActionArgs, PluginAction } from "../plugins/PluginAction";
import { useLastFocused } from "./LastFocusedNode";
import { createEditorState } from "./EditorState";
import { ConstraintsPlugin } from "../features/constraints/ConstraintsPlugin";

//Typings do not seem to match exported object :/
const Stylis: any = StylisDefault;

// These core plugins can be overriden (or disabled) by passing a plugin with the same "name"
// to <EditorKit plugins={...}/>
const InternalPlugins: Plugin[] = [
  DefaultThemePlugin,
  IconProviderPlugin,
  SelectionExtensionsPlugin,
  createLabelsPlugin(),
  AutoFocusPlugin,
  BackspaceKeyPlugin,
  EnterKeyPlugin,
  ConstraintsPlugin,
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
  executeAction(plugin: string, args?: PluginActionArgs, name?: string): void;
  isActionActive(
    plugin: string,
    args?: PluginActionArgs,
    name?: string
  ): boolean;
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

  const last = useLastFocused(editor);
  const state = createEditorState(last, editor);

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

  const resolveAction = (pluginName: string, name?: string) => {
    const plugin = plugins.find((plugin) => plugin.name === pluginName);
    if (!plugin) {
      throw Error(`No plugin is registered with name ${pluginName}`);
    }
    if (!plugin.actions) {
      return { plugin };
    }
    let action: PluginAction | undefined = plugin.actions && plugin.actions[0];

    if (name) {
      action = plugin.actions.find((plugin) => (plugin.name = name));
    }
    if (!action) {
      throw Error(`No action found on plugin ${pluginName} with name ${name}`);
    }
    return { plugin, action };
  };

  const isActionActive = (
    pluginName: string,
    args?: PluginActionArgs,
    name?: string
  ) => {
    const { plugin, action } = resolveAction(pluginName, name);
    return Boolean(action && action.isActionActive(state, plugin, args));
  };

  const executeAction = (
    pluginName: string,
    args?: PluginActionArgs,
    name?: string
  ) => {
    const { plugin, action } = resolveAction(pluginName, name);
    if (!action) {
      throw Error(`No action found ${pluginName} ${name}`);
    }
    action.action(state, plugin, args);
  };

  const {
    spellCheck,
    disableSpellCheck,
    enableSpellCheck,
    delaySpellCheck,
  } = useSpellcheck(Boolean(props.spellCheck), id, render);

  // //TODO remove this hack once workaround is found
  // useEffect(() => {
  //   const { onChange } = editor;
  //   editor.onChange = () => {
  //     onChange();
  //     render();
  //   };
  // }, []);

  const value = {
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
    executeAction,
    isActionActive,
  };

  return (
    <Context.Provider value={value}>
      <Fragment>{children}</Fragment>
      <FileUpload />
    </Context.Provider>
  );
});

export const UploadId = "uploadMedia";
export const FileUpload = () => (
  <input type="file" id={UploadId} hidden multiple />
);

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
    if (plugin.editorStyle) {
      let css = plugin.editorStyle;
      if (typeof plugin.editorStyle === "function") {
        css = plugin.editorStyle(id);
      }
      editorStyles.push(css as string);
    }
    if (plugin.globalStyle) {
      let css = plugin.globalStyle;
      if (typeof plugin.globalStyle === "function") {
        css = plugin.globalStyle(id);
      }
      globalStyles.push(css as string);
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
      Transforms.removeNodes(editor, { at: [0] });
      Transforms.insertNodes(editor, value);
    };

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
