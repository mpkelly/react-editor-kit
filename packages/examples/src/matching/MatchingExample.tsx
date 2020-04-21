import React, { useState, CSSProperties, useCallback, useMemo } from "react";
import { Node, Range, Path, NodeEntry } from "slate";
import { ReactEditor, RenderLeafProps } from "slate-react";
import {
  Editor,
  EditorKit,
  Plugin,
  BoldPlugin,
  ItalicPlugin,
  DefaultThemePlugin,
  UnderlinePlugin,
  StrikethroughPlugin,
  findMatches,
  EditorRange,
  useEditorKit,
} from "@mpkelly/react-editor-kit";

const plugins: Plugin[] = [
  DefaultThemePlugin,
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
  StrikethroughPlugin,
];

const initialValue = [
  {
    type: "paragraph",
    children: [
      {
        text: `I wandered lonely as a cloud
    That floats on high o'er vales and hills,
    When all at once I saw a crowd,
    A host, of golden daffodils;
    Beside the lake, beneath the trees,
    Fluttering and dancing in the breeze.`,
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: `Continuous as the stars that shine
    And twinkle on the milky way,
    They stretched in never-ending line
    Along the margin of a bay:
    Ten thousand saw I at a glance,
    Tossing their heads in sprightly dance.`,
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: `The waves beside them danced; but they
        Out-did the sparkling waves in glee:
        A poet could not but be gay,
        In such a jocund company:
        I gazed—and gazed—but little thought
        What wealth the show to me had brought:`,
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: `For oft, when on my couch I lie
        In vacant or in pensive mood,
        They flash upon that inward eye
        Which is the bliss of solitude;
        And then my heart with pleasure fills,
        And dances with the daffodils.`,
      },
    ],
  },
];

const editorStyle = {
  width: 500,
  height: 500,
  padding: 8,
  border: "1px solid rgba(0,0,0,.1)",
  borderRadius: 3,
  overflow: "auto",
};

const containerStyle = {
  display: "flex",
};

export interface State {
  ranges: Range[];
  pattern: string;
  regex: boolean;
  matchRange: EditorRange;
}

export const MatchingExample = () => {
  const allPlugins: Plugin[] = useMemo(() => {
    return plugins.concat([
      {
        decorate: ([, path]: NodeEntry, editor: ReactEditor) => {
          const ranges = (editor.highlightRanges || []) as Range[];
          const filtered = ranges
            .filter((range) => Path.isDescendant(range.focus.path, path))
            .map((range) => ({
              ...range,
              type: "highlight",
            }));
          return filtered;
        },
        renderLeaf: (props: RenderLeafProps) => {
          const { attributes, children, leaf } = props;
          if (leaf.type === "highlight") {
            return (
              <span {...attributes} style={{ background: "yellow" }}>
                {children}
              </span>
            );
          }
          return undefined;
        },
      },
    ]);
  }, []);

  return (
    <EditorKit plugins={allPlugins}>
      <MatchingEditor />
    </EditorKit>
  );
};

export const MatchingEditor = () => {
  const {
    state,
    value,
    setValue,
    handleClick,
    handleSettingsChange,
  } = useMatching();
  return (
    <div style={containerStyle}>
      <div onClick={handleClick}>
        <Editor
          value={value}
          onChange={setValue}
          style={editorStyle}
          autoFocus
        />
      </div>
      <Settings state={state} onChange={handleSettingsChange} />
    </div>
  );
};

const useMatching = () => {
  const [value, setValue] = useState<Node[]>(initialValue);
  const [state, setState] = useState<State>(initialState());
  const { editor } = useEditorKit();
  const handleClick = useCallback(() => {
    if (!editor) {
      return;
    }
    if (state.pattern) {
      const search = state.regex
        ? new RegExp(state.pattern, "g")
        : state.pattern;
      const ranges = findMatches(
        search,
        state.matchRange,
        editor as ReactEditor
      );
      editor.highlightRanges = ranges;
      setValue((value) => value.slice());
    } else {
      editor.highlightRanges = [];
    }
    //TODO remove when this is released https://github.com/ianstormtaylor/slate/pull/3437
    setValue((value) => JSON.parse(JSON.stringify(value)));
  }, [state, editor]);

  return {
    state,
    value,
    setValue,
    handleClick,
    handleSettingsChange: setState,
  };
};

const settingsStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  padding: "0 16px",
};

interface SettingsProps {
  state: State;
  onChange(state: State): void;
}

const Settings = (props: SettingsProps) => {
  const { state, onChange } = props;
  return (
    <div style={settingsStyle}>
      <input
        placeholder="Enter pattern"
        value={state.pattern}
        style={{ height: 30 }}
        onChange={(e) => {
          const pattern = e.currentTarget.value;
          onChange({ ...state, pattern });
        }}
      />
      <label htmlFor="regex">
        <input
          type="checkbox"
          name="regex"
          checked={state.regex}
          onChange={() => {
            onChange({ ...state, regex: !state.regex });
          }}
        />
        regex?
      </label>
      <div style={{ display: "flex", flexWrap: "wrap", maxWidth: 400 }}>
        {ranges.map((range) => (
          <button
            key={range}
            onClick={() => {
              onChange({ ...state, matchRange: range });
            }}
            style={{
              margin: 16,
              background: range == state.matchRange ? "orange" : undefined,
            }}
          >
            {range}
          </button>
        ))}
      </div>
    </div>
  );
};

const initialState = (): State => ({
  ranges: [],
  regex: true,
  pattern: "",
  matchRange: "block-before",
});

const ranges: EditorRange[] = [
  "character-before",
  "character-after",
  "word-before",
  "word-after",
  "line",
  "line-before",
  "line-after",
  "block",
  "block-before",
  "block-after",
];
