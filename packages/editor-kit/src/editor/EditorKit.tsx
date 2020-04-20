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
import { createEditor as createSlateEditor } from "slate";
import { withReact, ReactEditor } from "slate-react";
import { Plugin } from "../plugins/Plugin";
import { DefaultThemePlugin } from "../features/theme/DefaultThemePlugin";
import { SelectionExtensionsPlugin } from "../features/selection/SelectionExtensionsPlugin";
import { IconProviderPlugin } from "../features/icons/IconProviderPlugin";
import { ConstraintsPlugin } from "../features/constraints/ConstraintsPlugin";
import { createGlobalStyle } from "styled-components";
import { deleteBackward } from "./Editor";
import { LabelsPlugin } from "../features/i18n/LabelsPlugin";
import { useSpellcheck } from "../features/spellcheck/SpellCheck";
import { AutoFocusPlugin } from "../features/auto-focus/AutoFocusPlugin";

const InternalPlugins: Plugin[] = [
  DefaultThemePlugin,
  IconProviderPlugin,
  SelectionExtensionsPlugin,
  ConstraintsPlugin,
  LabelsPlugin,
  AutoFocusPlugin,
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
}

export const EditorKit = memo((props: EditorKitProps) => {
  const { children, onEditor } = props;
  const plugins = getPlugins(props.plugins);
  const editor: ReactEditor = createEditor(plugins);
  const [, forceUpdate] = useState({});
  const [readOnly, setReadOnly] = useState(Boolean(props.readOnly));
  maybeConfigureTesting(editor, forceUpdate);
  const Style = useRef(generateStyle(plugins));
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
  } = useSpellcheck(Boolean(props.spellCheck), render);

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
  };

  return (
    <Fragment>
      <Style.current />
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
  ).concat(userPlugins);
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
  const globalStyle = globalStyles.join("\n");
  return createGlobalStyle` ${globalStyle} ${editorStyle}`;
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
    global.deleteBackward = (distance: number, unit: string = "character") => {
      deleteBackward(editor, distance, unit as any);
    };
  }
};
