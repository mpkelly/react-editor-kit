import React, { useCallback, CSSProperties, memo, useEffect } from "react";
import {
  Editor as SlateEditor,
  Location,
  Range,
  Transforms,
  NodeEntry,
  Path,
  Text,
  Node,
} from "slate";
import {
  Editable,
  Slate,
  RenderElementProps,
  RenderLeafProps,
  ReactEditor,
} from "slate-react";
import { Plugin } from "../plugins/Plugin";
import { useEditorKit } from "./EditorKit";
import { findMatches } from "./Matching";

export interface EditorProps {
  value: Node[];
  onChange(nodes: Node[]): void;
  autoFocus?: boolean;
  className?: string;
  placeholder?: string;
  style?: CSSProperties;
  role?: string;
  as?: React.ElementType;
}

export const Editor = (props: EditorProps) => {
  const { value, onChange, className, style, ...rest } = props;
  const {
    editor,
    plugins,
    spellCheck,
    delaySpellCheck,
    readOnly,
  } = useEditorKit();
  const renderElement = useCallback(
    (props: RenderElementProps) => handleRenderElement(props, plugins),
    []
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => handleRenderLeaf(props, plugins, editor),
    []
  );

  const decorate = useCallback(
    (entry: NodeEntry) => handleDecorate(entry, plugins, editor),
    []
  );

  const keyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      delaySpellCheck();
      handleKeyDown(event, plugins, editor);
    },
    [spellCheck]
  );

  const keyUp = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    handleKeyUp(event, plugins, editor);
  }, []);

  const click = useCallback(
    (event: React.MouseEvent<HTMLElement>) =>
      handleClick(event, plugins, editor),
    []
  );

  const paste = useCallback((event) => {
    const clipboardData = event.clipboardData;
    const pastedData = clipboardData.getData("Text");
    if (!pastedData) {
      return;
    }
    editor.insertText(pastedData);
  }, []);

  return (
    <Slate editor={editor} value={value} onChange={onChange}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        decorate={decorate}
        onPaste={paste}
        onKeyDown={keyDown}
        onKeyUp={keyUp}
        onClick={click}
        style={style}
        spellCheck={spellCheck}
        readOnly={readOnly}
        {...rest}
      />
    </Slate>
  );
};

const handleRenderElement = (props: RenderElementProps, plugins: Plugin[]) => {
  let style: CSSProperties = {};
  let element: JSX.Element | undefined;

  for (let plugin of plugins) {
    if (plugin.renderElement) {
      element = plugin.renderElement(props) || element;
    }
    if (plugin.styleElement) {
      const otherStyle = plugin.styleElement(props) || {};
      style = { ...style, ...otherStyle };
    }
  }
  element = element || <p {...props.attributes}>{[props.children]}</p>;
  if (Object.keys(style).length) {
    return React.cloneElement(element, { style });
  }
  return element;
};

const handleRenderLeaf = (
  props: RenderLeafProps,
  plugins: Plugin[],
  editor: ReactEditor
) => {
  let copy = { ...props };
  for (let plugin of plugins) {
    if (plugin.renderLeaf) {
      const leaf = plugin.renderLeaf(copy, editor);
      if (leaf) {
        copy = { ...copy, children: leaf };
      }
    }
  }
  return <span {...copy.attributes}>{copy.children}</span>;
};

const handleDecorate = (
  entry: NodeEntry,
  plugins: Plugin[],
  editor: ReactEditor
) => {
  let ranges: Range[] = [];
  for (let plugin of plugins) {
    if (plugin.decorate) {
      const result = plugin.decorate(entry, editor);
      if (result) {
        return (ranges = ranges.concat(result));
      }
    }
  }
  return ranges;
};

const handleKeyUp = (
  event: React.KeyboardEvent<HTMLDivElement>,
  plugins: Plugin[],
  editor: ReactEditor
) => {
  const { selection } = editor;
  if (!selection) {
    return;
  }
  const [node, path] = SlateEditor.node(editor, selection as Location);
  if (!path.length) {
    return;
  }
  const [parent] = SlateEditor.parent(editor, path);
  if (parent) {
    for (let plugin of plugins) {
      if (plugin.triggers) {
        for (let trigger of plugin.triggers) {
          const matches = findMatches(trigger.pattern, trigger.range, editor);
          if (matches.length) {
            plugin.onTrigger && plugin.onTrigger(editor, matches, trigger);
            return;
          }
        }
      }
    }
  }
};

const handleKeyDown = (
  event: React.KeyboardEvent<HTMLDivElement>,
  plugins: Plugin[],
  editor: ReactEditor
) => {
  for (let plugin of plugins) {
    if (plugin.onKeyDown) {
      if (plugin.onKeyDown(event, editor)) {
        return;
      }
    }
  }
};

const handleClick = (
  event: React.MouseEvent<HTMLElement>,
  plugins: Plugin[],
  editor: SlateEditor
) => {
  plugins.forEach((plugin) => {
    if (plugin.onClick) {
      plugin.onClick(event, editor);
    }
  });
};

export const getNextBlock = (editor: ReactEditor) => {
  if (editor.selection) {
    if (isAtStartOfNode(editor)) {
      const next = SlateEditor.next(editor);
      if (next) {
        const nextParent = SlateEditor.parent(editor, next[1]);
        if (nextParent) {
          return nextParent[0];
        }
      }
    }
  }
  return null;
};

export const getPreviousBlock = (editor: ReactEditor) => {
  if (editor.selection) {
    if (isAtStartOfNode(editor)) {
      const previous = SlateEditor.previous(editor);
      if (previous) {
        const previousParent = SlateEditor.parent(editor, previous[1]);
        if (previousParent) {
          return previousParent[0];
        }
      }
    }
  }
  return null;
};

export const isNavigatingInto = (editor: ReactEditor, type: string) => {
  const previous = getPreviousBlock(editor);
  return previous && previous.type == type;
};

export const isNodeFocused = (editor: ReactEditor, type: string) => {
  if (editor.selection) {
    const [, path] = SlateEditor.node(editor, editor.selection);
    if (path.length) {
      const [parent] = SlateEditor.parent(editor, path);
      return parent && parent.type === type;
    }
  }
  return false;
};

export const isAtStartOfNode = (editor: ReactEditor) => {
  if (editor.selection) {
    const { anchor, focus } = editor.selection;
    return anchor.offset == 0 && focus.offset == 0;
  }
  return false;
};

export const deletePreviousNode = (editor: ReactEditor) => {
  const previous = SlateEditor.previous(editor);
  if (previous) {
    const previousParent = SlateEditor.parent(editor, previous[1]);
    if (previousParent) {
      Transforms.delete(editor, { at: previousParent[1] });
    }
  }
};

export const isOnLastLineOfBlock = (editor: ReactEditor) => {
  if (editor.selection) {
    const [, path] = SlateEditor.node(editor, editor.selection);
    if (path.length) {
      const [parent] = SlateEditor.parent(editor, path);
      const text = Node.string(parent);
      return !text.substring(editor.selection.focus.offset).includes("\n");
    }
  }
  return false;
};

export const getActiveNode = (editor: ReactEditor) => {
  if (editor.selection) {
    const [, path] = SlateEditor.node(editor, editor.selection);
    if (path.length) {
      const [parent] = SlateEditor.parent(editor, path);
      return parent;
    }
  }
  return null;
};

export const getActiveNodeType = (editor: ReactEditor) => {
  const block = getActiveNode(editor);
  return block ? block.type : null;
};

export const isInLastBlock = (editor: ReactEditor) => {
  if (editor.selection) {
    const [, path] = SlateEditor.node(editor, editor.selection);
    if (path.length) {
      const [, parentPath] = SlateEditor.parent(editor, path);
      return SlateEditor.next(editor, { at: parentPath }) === undefined;
    }
  }
  return false;
};

export const moveToEndOfBlock = (editor: ReactEditor) => {
  if (editor.selection) {
    const [, path] = SlateEditor.node(editor, editor.selection);
    const [parent] = SlateEditor.parent(editor, path);
    const text = Node.string(parent);
    const { anchor, focus } = editor.selection;
    const offset = text.length;
    const range = {
      anchor: { ...anchor, offset },
      focus: { ...focus, offset },
    };
    Transforms.select(editor, range);
  }
};

export const getPropertyValueAtCursor = (
  propertyName: string,
  editor: ReactEditor,
  defaultValue: any = null
) => {
  const { selection } = editor;

  if (!selection || !ReactEditor.isFocused(editor)) {
    return defaultValue;
  }
  const domSelection = window.getSelection() as Selection;
  if (domSelection.rangeCount === 0) {
    return defaultValue;
  }

  const element = domSelection.getRangeAt(0).startContainer
    .parentNode as HTMLElement;
  const styles: any = window.getComputedStyle(element, null);
  return styles[propertyName];
};

export const deleteBackward = (
  editor: ReactEditor,
  length: number,
  unit: "character" | "word" | "line" | "block" = "character"
) => {
  Array.from({ length }).forEach((count) => {
    editor.deleteBackward({ unit } as any);
  });
};

export const addMarkAtRange = (
  editor: ReactEditor,
  range: Range,
  type: string,
  value: any
) => {
  Transforms.select(editor, range);
  editor.addMark(type, value);
  Transforms.collapse(editor, { edge: "end" });
};

export const getSelectionRootNodes = (
  selection: Range,
  editor: ReactEditor
) => {
  const anchor = selection.anchor.path.slice();
  //Selection paths point to text nodes, so move up to parent level
  anchor.pop();
  const focus = selection.focus.path.slice(0, anchor.length);
  const nodes: Node[] = [];
  for (let [node, path] of SlateEditor.nodes(editor, {
    at: selection,
  })) {
    //Ignore text nodes, the editor node and nodes below the selection
    if (!node.type || !path.length || !(path.length <= focus.length)) {
      continue;
    }
    const hasParent = nodes.find((_node) =>
      Path.isParent(ReactEditor.findPath(editor, _node), path)
    );
    //Don't add a node if it's parent (root) has been added already
    if (hasParent) {
      continue;
    }
    const equal = Path.equals(path, anchor) || Path.equals(path, focus);
    const within = Path.isAfter(path, anchor) && Path.isBefore(path, focus);
    //Is same path or within the range of the selection
    if (equal || within) {
      nodes.push(node);
    }
  }
  return nodes;
};

export const getAncestor = (editor: ReactEditor, node: Node, level = 1) => {
  let parent: Node | null = null;
  let count = 0;
  while (count !== level) {
    count++;
    const path = ReactEditor.findPath(editor, node);
    parent = SlateEditor.parent(editor, path)[0];
    if (parent === editor) {
      return null;
    }
    node = parent;
  }
  return parent;
};
