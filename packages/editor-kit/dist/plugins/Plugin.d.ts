import { NodeEntry, Range, Element } from "slate";
import { RenderElementProps, RenderLeafProps, ReactEditor } from "slate-react";
import { CSSProperties } from "react";
import { ContextMenuContribution } from "../features/context-menu/ContextMenu";
import { PluginAction } from "./PluginAction";
import { Trigger } from "./Trigger";
import { KeyHandler } from "./KeyHandler";
import { EditorState } from "../editor/EditorState";
/**
 * Changes:
 *
 * 1. Merge Trigger and onTrigger
 * 2. Add options property
 * 3. rename contextMenu to onContextMenu
 * 4. Allow arbitrary properties
 * 6. Add constraints
 * 7. Add Trigger.clear:boolean prop
 * 8. Move actions into Plugins
 */
export interface Plugin {
    /**
     * A name means your plugin can be called inside of React components
     * that existing under the <EditorKit> context scope using usePlugin("name").
     *
     * Names also allow you to replace internal plugins with your own. When you
     * register your plugins to <EditorKit plugins={[...]}>, the library will
     * check the names of each if it finds a name of an internal plugin then it will
     * swap the internal plugin with the plugin you registered. This allows you to
     * inject your own icons into Editor Kit by providing a plugin named "icon-provider",
     * for example.
     */
    name: string;
    /**
     * The order the Plugin is registered is important if you listen on events
     * that can only be handled by a single plugin. For example, EditorKit will
     * return early onKeyDown once a Plugin returns true from onKeyDown.
     *
     * Order can also be important for Plugins that contribute CSS (see below)
     * due to CSS cascading behaviour.
     *
     * Default order is the position in the Plugin array passed to EditorKit.
     *
     */
    order?: number;
    /**
     * Extend the Slate editor with additional functionality or
     * wrap existing functions like normalizeNode
     */
    withPlugin?(editor: ReactEditor): ReactEditor;
    /**
     * Array of actions that plugin provides. A name is required for each
     * if more than one is available.
     */
    actions?: PluginAction[];
    /**
     * Triggers are patterns entered into the Editor, e.g. @mention, which can trigger
     * a response by the Plugin such as showing a user list or turning the content bold.
     */
    triggers?: Trigger[];
    /**
     * Contribute style to an Element without having to render it. This avoids
     * having to create unnecessary wrapper Elements just to change things like
     * text-align of existing Elements.
     */
    styleElement?: (props: RenderElementProps) => CSSProperties | undefined;
    /**
     * Contribute classes to an Element without having to render it.
     * Similar to `styleElement` above.
     */
    getClasses?: (element: Element) => string | undefined;
    /**
     * Render an Element into the Editor. You can output any JSX content you like
     * here according to the `props.element.type`
     *
     * The is the same as Slate's renderElement function and requires that
     * you spread `props.attributes` on your root element and pass
     * the `props.children` prop to your lowest JSX element.
     */
    renderElement?: (props: RenderElementProps) => JSX.Element | undefined;
    /**
     * Render an Leaf into the Editor. You can output any JSX content you like
     * here according to the `props.leaf.type`. This Leaf content will become the
     * child of an Element that gets rendered by renderElement above.
     *
     * The is the same as Slate's renderLeaf function and requires that
     * you spread `props.attributes` on your root element and pass
     * the `props.children` prop to your lowest JSX element.
     */
    renderLeaf?: (props: RenderLeafProps, state: EditorState) => JSX.Element | undefined;
    /**
     *
     */
    decorate?: (entry: NodeEntry, editor: ReactEditor) => Range[];
    /**
     * Similar to triggers but typical used for keyboard shortcuts or modifying the
     * Editors handling of delete/backspace or enter for certain elements
     */
    onKey?: KeyHandler[];
    /**
     * Respond to key down events on the Editor element. Use onKey if you are interested in a certain
     * key or key combo.
     */
    onKeyDown?(event: React.KeyboardEvent, state: EditorState): boolean | undefined;
    /**
     * Respond to click events that happen on the Editor element.
     */
    onClick?(event: React.MouseEvent<HTMLElement>, state: EditorState): void;
    /**
     * Allows contributing to the context menu and overriding the browser's default.
     * See ContextMenuContribution for more info.
     */
    onContextMenu?: ContextMenuContribution[];
    /**
     * Styles that should be applied to the Editor instance. EditorKit uses the npm
     * package stylis and supports nested selectors like:
     *
     *  .someClass {
     *    &:hover {
     *
     *    }
     *  }
     *
     */
    editorStyle?: string;
    /**
     * These styles can target the whole page so be careful. Things like dialogs and toolbars
     * are rendered outside of the Editor and can be targeted here.
     */
    globalStyle?: string;
    /**
     * Plugins can act as a data providers and store arbitrary data. Icon are text labels
     * are shared throughout EditorKit in this way.
     */
    [key: string]: any;
}
export declare const createPlugin: (plugin: Plugin, ...triggers: Trigger[]) => {
    triggers: Trigger[];
    /**
     * A name means your plugin can be called inside of React components
     * that existing under the <EditorKit> context scope using usePlugin("name").
     *
     * Names also allow you to replace internal plugins with your own. When you
     * register your plugins to <EditorKit plugins={[...]}>, the library will
     * check the names of each if it finds a name of an internal plugin then it will
     * swap the internal plugin with the plugin you registered. This allows you to
     * inject your own icons into Editor Kit by providing a plugin named "icon-provider",
     * for example.
     */
    name: string;
    /**
     * The order the Plugin is registered is important if you listen on events
     * that can only be handled by a single plugin. For example, EditorKit will
     * return early onKeyDown once a Plugin returns true from onKeyDown.
     *
     * Order can also be important for Plugins that contribute CSS (see below)
     * due to CSS cascading behaviour.
     *
     * Default order is the position in the Plugin array passed to EditorKit.
     *
     */
    order?: number;
    /**
     * Extend the Slate editor with additional functionality or
     * wrap existing functions like normalizeNode
     */
    withPlugin?(editor: ReactEditor): ReactEditor;
    /**
     * Array of actions that plugin provides. A name is required for each
     * if more than one is available.
     */
    actions?: PluginAction[];
    /**
     * Contribute style to an Element without having to render it. This avoids
     * having to create unnecessary wrapper Elements just to change things like
     * text-align of existing Elements.
     */
    styleElement?: (props: RenderElementProps) => CSSProperties;
    /**
     * Contribute classes to an Element without having to render it.
     * Similar to `styleElement` above.
     */
    getClasses?: (element: Element) => string;
    /**
     * Render an Element into the Editor. You can output any JSX content you like
     * here according to the `props.element.type`
     *
     * The is the same as Slate's renderElement function and requires that
     * you spread `props.attributes` on your root element and pass
     * the `props.children` prop to your lowest JSX element.
     */
    renderElement?: (props: RenderElementProps) => JSX.Element;
    /**
     * Render an Leaf into the Editor. You can output any JSX content you like
     * here according to the `props.leaf.type`. This Leaf content will become the
     * child of an Element that gets rendered by renderElement above.
     *
     * The is the same as Slate's renderLeaf function and requires that
     * you spread `props.attributes` on your root element and pass
     * the `props.children` prop to your lowest JSX element.
     */
    renderLeaf?: (props: RenderLeafProps, state: EditorState) => JSX.Element;
    /**
     *
     */
    decorate?: (entry: NodeEntry<import("slate").Node>, editor: ReactEditor) => Range[];
    /**
     * Similar to triggers but typical used for keyboard shortcuts or modifying the
     * Editors handling of delete/backspace or enter for certain elements
     */
    onKey?: KeyHandler[];
    /**
     * Respond to key down events on the Editor element. Use onKey if you are interested in a certain
     * key or key combo.
     */
    onKeyDown?(event: import("react").KeyboardEvent<globalThis.Element>, state: EditorState): boolean;
    /**
     * Respond to click events that happen on the Editor element.
     */
    onClick?(event: import("react").MouseEvent<HTMLElement, MouseEvent>, state: EditorState): void;
    /**
     * Allows contributing to the context menu and overriding the browser's default.
     * See ContextMenuContribution for more info.
     */
    onContextMenu?: ContextMenuContribution[];
    /**
     * Styles that should be applied to the Editor instance. EditorKit uses the npm
     * package stylis and supports nested selectors like:
     *
     *  .someClass {
     *    &:hover {
     *
     *    }
     *  }
     *
     */
    editorStyle?: string;
    /**
     * These styles can target the whole page so be careful. Things like dialogs and toolbars
     * are rendered outside of the Editor and can be targeted here.
     */
    globalStyle?: string;
};
