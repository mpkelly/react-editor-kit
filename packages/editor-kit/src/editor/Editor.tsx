import React, {
  useCallback,
  CSSProperties,
  memo,
  useState,
  Fragment,
  ReactNode,
} from "react";
import {
  Editor as SlateEditor,
  Location,
  Range,
  Transforms,
  NodeEntry,
  Path,
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
import { clone } from "../ui/Utils";
import { ContextMenu } from "../features/context-menu/ContextMenu";
import { Show } from "../ui/Show";
import isHotkey from "is-hotkey";
import { EditorState, createEditorState } from "./EditorState";
import { useLastFocused } from "./LastFocusedNode";
import { useForceUpdate } from "../ui/ForceUpdate";

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

export const Editor = memo((props: EditorProps) => {
  const { value, onChange, className, style, ...rest } = props;
  const {
    editor,
    plugins,
    spellCheck,
    delaySpellCheck,
    readOnly,
    id,
    onClick,
  } = useEditorKit();
  const [menu, setMenu] = useState<{
    items: ReactNode[];
    x: number;
    y: number;
  }>({ items: [], x: 0, y: 0 });
  useLastFocused(editor);

  const createState = () => {
    const { selection } = editor;
    const point = selection ? selection.focus : undefined;
    const [element] = point ? SlateEditor.parent(editor, point) : [];

    return createEditorState({ selection, point, element }, editor);
  };

  const renderElement = useCallback(
    (props: RenderElementProps) => handleRenderElement(props, plugins),
    [plugins]
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => handleRenderLeaf(props, plugins, createState()),
    [plugins]
  );

  const decorate = useCallback(
    (entry: NodeEntry) => handleDecorate(entry, plugins, editor),
    [plugins]
  );

  const keyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      delaySpellCheck();
      handleCloseMenu();
      handleKeyDown(event, plugins, createState());
    },
    [spellCheck, plugins]
  );

  const keyUp = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      handleKeyUp(event, plugins, createState());
    },
    [plugins]
  );

  const click = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      onClick();
      handleCloseMenu();
      handleClick(event, plugins, createState());
    },
    [plugins]
  );

  const contextMenu = useCallback(
    (event: React.MouseEvent) => {
      const items = handleContextMenu(event, plugins, createState());
      const x = event.clientX;
      const y = event.clientY;

      if (items.length) {
        event.stopPropagation();
        event.preventDefault();
      }
      setMenu({ items, x, y });
    },
    [plugins]
  );

  const drop = useCallback(
    (event: React.DragEvent) => {
      handleDrop(event, plugins, createState());
    },
    [plugins]
  );

  const handleCloseMenu = useCallback(() => {
    if (menu.items.length) {
      setMenu({ items: [], x: 0, y: 0 });
    }
  }, [menu]);

  return (
    <Slate editor={editor} value={ensureValue(value)} onChange={onChange}>
      <Fragment>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          decorate={decorate}
          onKeyDown={keyDown}
          onKeyUp={keyUp}
          onClick={click}
          onContextMenu={contextMenu}
          style={style}
          spellCheck={spellCheck}
          readOnly={readOnly}
          onDrop={drop}
          id={`${id}`}
          {...rest}
        />
        <Show when={menu.items.length}>
          <ContextMenu {...menu} onClose={handleCloseMenu} />
        </Show>
      </Fragment>
    </Slate>
  );
});

const DefaultEmptyValue: Node[] = [
  { type: "paragraph", children: [{ text: "" }] },
];

const ensureValue = (value: Node[]) => {
  if (value.length == 0) {
    return clone(DefaultEmptyValue);
  }
  return value;
};

const handleRenderElement = (props: RenderElementProps, plugins: Plugin[]) => {
  let style: CSSProperties = {};
  let classes = "";
  let element: JSX.Element | undefined;

  for (let plugin of plugins) {
    if (plugin.renderElement) {
      element = plugin.renderElement(props) || element;
    }
    if (plugin.styleElement) {
      const otherStyle = plugin.styleElement(props) || {};
      style = { ...style, ...otherStyle };
    }
    if (plugin.getClasses) {
      classes = `${classes} ${plugin.getClasses(props.element)}`;
    }
  }
  element = element || <p {...props.attributes}>{[props.children]}</p>;

  if (Object.keys(style).length || classes) {
    return React.cloneElement(element, {
      style,
      className: classes,
      id: props.element.id,
    });
  }

  return element;
};

const handleRenderLeaf = (
  props: RenderLeafProps,
  plugins: Plugin[],
  state: EditorState
) => {
  let copy = { ...props };
  for (let plugin of plugins) {
    if (plugin.renderLeaf) {
      const leaf = plugin.renderLeaf(copy, state);
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
  state: EditorState
) => {
  const { editor } = state;
  const { selection } = editor;
  if (!selection) {
    return;
  }
  const [, path] = SlateEditor.node(editor, selection as Location);
  if (!path.length) {
    return;
  }
  const [parent] = SlateEditor.parent(editor, path);
  if (parent) {
    for (let plugin of plugins) {
      if (plugin.triggers) {
        for (let trigger of plugin.triggers) {
          const matches = findMatches(trigger.pattern, editor, trigger.range);
          if (matches.length) {
            event.preventDefault();
            if (trigger.clear == undefined || trigger.clear) {
              const range = matches[0].range;
              Transforms.delete(editor, { at: range });
            }
            if (trigger.onMatch) {
              trigger.onMatch(state, matches, plugin);
            } else if (plugin.actions) {
              //If onMatch is not set then execute the default PluginAction
              plugin.actions[0].action(state, plugin, { matches });
            }
          }
        }
      }
    }
  }
};

const handleContextMenu = (
  event: React.MouseEvent,
  plugins: Plugin[],
  state: EditorState
) => {
  const { element, selection, editor } = state;
  let items: ReactNode[] = [];
  const marks = editor.marks || {};
  for (let plugin of plugins) {
    if (plugin.onContextMenu) {
      for (let choice of plugin.onContextMenu)
        if (choice.trigger === undefined) {
          items = items.concat(choice.items);
        } else {
          const { trigger } = choice;
          if (trigger.node !== undefined) {
            if (!element) {
              continue;
            }
            if (element.type !== trigger.node) {
              continue;
            }
          }
          if (trigger.mark !== undefined) {
            if (!marks[trigger.mark]) {
              continue;
            }
          }
          if (trigger.selectionExpanded !== undefined) {
            if (!selection) {
              continue;
            }
            if (trigger.selectionExpanded && !Range.isExpanded(selection)) {
              continue;
            }
          }
          if (trigger.matched && !trigger.matched(state)) {
            continue;
          }
          items = items.concat(choice.items);
        }
    }
  }
  return items;
};

const handleKeyDown = (
  event: React.KeyboardEvent<HTMLDivElement>,
  plugins: Plugin[],
  state: EditorState
) => {
  for (let plugin of plugins) {
    if (plugin.onKey) {
      for (let handler of plugin.onKey) {
        if (isHotkey(handler.pattern, event.nativeEvent)) {
          if (handler.handle(state, event.nativeEvent, plugin)) {
            return;
          }
        }
      }
    }
    if (plugin.onKeyDown) {
      if (plugin.onKeyDown(event, state)) {
        return;
      }
    }
  }
};

const handleClick = (
  event: React.MouseEvent<HTMLElement>,
  plugins: Plugin[],
  state: EditorState
) => {
  plugins.forEach((plugin) => {
    if (plugin.onClick) {
      plugin.onClick(event, state);
    }
  });
};

const handleDrop = (
  event: React.DragEvent,
  plugins: Plugin[],
  state: EditorState
) => {
  plugins.forEach((plugin) => {
    if (plugin.onDrop && plugin.onDrop(event, state)) {
      return;
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

export const isAtEndOfNode = (editor: ReactEditor) => {
  if (editor.selection) {
    const { anchor, focus } = editor.selection;
    const node = getActiveNode(editor);
    if (node) {
      const length = Node.string(node).length;
      return anchor.offset === length && focus.offset === length;
    }
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
//NOTE: does not account for text wrapping
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
    const path = editor.selection.focus.path.slice();
    const [node] = SlateEditor.node(editor, path);
    if (node.text !== undefined) {
      const parent = SlateEditor.parent(editor, path);
      if (parent) {
        return parent[0];
      }
    }
    return node;
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
  Array.from({ length }).forEach(() => {
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
  //Move to Element
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
  while (node && count !== level) {
    count++;
    const path = ReactEditor.findPath(editor, node);
    if (path.length === 0) {
      return null;
    }
    parent = SlateEditor.parent(editor, path)[0];
    if (parent === editor) {
      return null;
    }
    node = parent;
  }
  return parent;
};
