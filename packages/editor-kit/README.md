# React Editor Kit

A suite of plugins for composing react-based text editors. Editor Kit is built using [Slate](https://github.com/ianstormtaylor/slate/) (v0.50+) - the fantastic editor framework for React. You don't need any Slate knowledge to use Editor Kit but it is recommended if you plan to extend it.

[LIVE EXAMPLES](https://codesandbox.io/s/react-editor-kit-examples-0e31g?file=/src/SimpleEditor.tsx)

**NOTE**

1. The project is currently in beta and you might experience some issues but the editor and most plugins are already usable
2. Micro-releases are being pushed to NPM frequently - please update often

## Quick Start

**Step one** Install the package

`npm i @mpkelly/react-editor-kit`

**Step two** Create an editor

The easiest way to create an editor is to start with one of the Code Sandbox examples above. It's probably best to start by copying all of the [KitchenSinkEditor](https://codesandbox.io/s/react-editor-kit-examples-0e31g?file=/src/KitchenSinkEditor.tsx) file and removing what you don't need.

**Step three** Load the CSS (if using). Editor Kit does not require external CSS but if you're using the `KitchenSinkEditor` then you'll need to load the CSS files for the icon font and custom editor font.

```CSS
    //index.html
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Material+Icons+Round|"
    />

    <link
      href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;0,700;1,400;1,700&display=swap"
      rel="stylesheet"
    />
```

## Further customisations

After playing around with one of the examples you'll probably want to start overriding CSS styles and provide your own icons and text labels. In Editor Kit, everything is basically a plugin and you override things by providing your own plugins.

### Overriding text labels

Take a look at [LabelsPlugin.ts](https://github.com/mpkelly/react-editor-kit/blob/master/packages/editor-kit/src/features/i18n/LabelsPlugin.ts) and then define your own like so:

```TypeScript

export const CustomLabels: EditorLabels = {
  addColumn: "Add new column",
 ...
}

const MyLabelsPlugin = {
  data: CustomLabels,
  name: "labels", //important
}

```

Then register `MyLabelsPlugin` when creating `<EditorKit plugins={[..]}/>` and your label plugin will override the default internal plugin with the same name.

### Overriding icons

Editor using some internal icons for things like dropdown and delete buttons. The [internal icons](https://github.com/mpkelly/react-editor-kit/blob/master/packages/editor-kit/src/features/icons/IconProviderPlugin.ts) are based on the Google Material Icons Regular set. You can override these icons in a similar way that you override labels above. Note that both SVG/Components and icon fonts are supported and can be mixed.

```TypeScript

const MyIconSet = {
    delete: {

      //Use Unicons icon set https://iconscout.com/unicons/explore/line

      className:"uil uil-trash-alt"
     //ligature: not needed here but ligature is supported, too
    },

    // In your SVG root element, copy the classes from the internal icon,
    // e.g. className="rek-icon dropdown-icon rek-svg-icon", so that styling is applied

    dropdownIcon: <MyDropdownSvgIcon/>
    ...
}

const MyIconPlugin = {
 data:MyIconSet,
 name: "icon-provider"
}

```

### Changing the base CSS

You will likely want to override the style from individual plugins. For example, if you wanted to override the `<ul/>` styles then you can see what CSS is being set by going to the [features folder](https://github.com/mpkelly/react-editor-kit/tree/master/packages/editor-kit/src/features) and searching for the feature (lists) and plugin (`UnorderedListPlugin`) you want to change. Editor Kit uses a minimal style so there's less to override when integrating with your own app but most plugins define at least some styling in their `*Plugin` file.

There is also a [DefaultThemePlugin](https://github.com/mpkelly/react-editor-kit/blob/master/packages/editor-kit/src/features/theme/DefaultThemePlugin.ts) plugin which includes some "core" styles for things like colors, buttons and panels used across the library. You should note the styles in this plugin that you want to override and then register your own style plugin to change them. You will almost certainly want to change the CSS variables (mainly colors) and probably also things like `box-shadow` and `border-radius` so they match your own app. Here is an example of how to create your own style plugin:

**NOTE** Don't use a name on your theme/style plugin unless you want to replace the _whole_ `DefaultThemePlugin` plugin, which you probably don't.

```TypeScript

export const MyTheme = {

 // Global styles can target the whole page - be careful with these

 globalStyles: () => `
     body {
      background-color: #151515
     }

    :root {
      --content-background: #2f2f2f;
      --primary-text-color: rgba(255,255,255, .95);
      --secondary-text-color: rgba(255,255,255, .54);
      ...
    }
 `,

 // These styles get applied to your editor instance which has a unqiue ID

 editorStyles: ()=> `
    h1 {
     font-family:serif;
    }
    ...
 `
```

Be sure to check the [Code Sandbox Examples](https://codesandbox.io/s/react-editor-kit-examples-0e31g?file=/src/SimpleEditor.tsx) to learn more about how to override and extend Editor Kit. If you're looking for a dark theme then [this example](https://codesandbox.io/s/react-editor-kit-examples-0e31g?file=/src/DarkThemePlugin.ts) is a good start, as well as well as being a good example how much work is involved in customizing the CSS (which isn't very much).

## Concepts

Editor Kit's source code and API are easy to understand but there are few concepts that are worth learning in advance.

### Plugins

Apart form a small core, the project functionality is plugin-based. This means you can turn on/off anything you like and also that you can extend Editor Kit with your own plugins. A [Plugin](https://github.com/mpkelly/react-editor-kit/blob/master/packages/editor-kit/src/plugins/Plugin.ts) definition looks like so:

```TypeScript
//All properties optional
export type Trigger = { pattern: MatchExpression; range: EditorRange };

export type HotKey = {pattern: string, handle: (editor: ReactEditor, event: KeyboardEvent, pattern: string) => boolean};

export interface Plugin {
  triggers?: Trigger[];
  onTrigger?(
    editor: ReactEditor,
    match?: MatchResult[],
    trigger?: Trigger
  ): void;
  styleElement?: (props: RenderElementProps) => CSSProperties | undefined;
  getClasses?: (element: Element) => string | undefined;
  renderElement?: (props: RenderElementProps) => JSX.Element | undefined;
  renderLeaf?: (
    props: RenderLeafProps,
    editor: ReactEditor
  ) => JSX.Element | undefined;
  decorate?: (entry: NodeEntry, editor: ReactEditor) => Range[];
  withPlugin?(editor: ReactEditor): ReactEditor;
  editorStyles?(): string;
  globalStyles?(): string;
  onHotKey?: HotKey[];
  onKeyDown?(
    event: React.KeyboardEvent<HTMLElement>,
    editor: ReactEditor
  ): boolean | undefined;
  onClick?(event: React.MouseEvent<HTMLElement>, editor: Editor): void;
  contextMenu?: ContextMenuContribution[];
  name?: string;
  data?: Object;
  order?: number;
}
```

As an example, imagine you wanted to replace the text `:)` with the smiley face 😀. You can do this by defining a plugin as follows:

```TypeScript
import { ReactEditor } from "slate-react";
import { Plugin } from "../../plugins/Plugin";

export const SmileyPlugin: Plugin = {
  triggers: [{ pattern: ":)", range: "block" }],
  onTrigger: (editor: ReactEditor) => {
    editor.deleteBackward("character");
    editor.deleteBackward("character");
    editor.insertText("😀");
  }
};
```

This is just a very simple plugin which doesn't even render JSX. To see more complex plugins you can browse the [features](https://github.com/mpkelly/react-editor-kit/tree/master/packages/editor-kit/src/features) folder.

Here's another simple plugin which actually renders JSX. This plugin triggers on the a regex match - the ">" character at the start of a line which is the common markdown shortcut for a blockquote element.

```TypeScript
export const QuotePlugin: Plugin = {
  triggers: [
    { pattern: /^>\s$/, range: "line-before" }
  ],
  onTrigger: (editor: ReactEditor, matches: MatchResult[]) => {
    if (matches[0]) {
      const range = matches[0].range;
      const length = range.focus.offset - range.anchor.offset;
      deleteBackward(editor, length);
      toggleBlock(editor, "quote");
    }
  },
  renderElement: (props: RenderElementProps) => {
    const { children, attributes, element } = props;
    if (element.type == "quote") {
      return <blockquote {...attributes}>{children}</blockquote>
    }
  }
};

```

You can do much more with plugins, including extending and overriding Slate. Please refer to the [plugin guide]("todo") for more info.

Editor Kit has some built-in plugins that are required, such as [IconProviderPlugin](https://github.com/mpkelly/react-editor-kit/blob/master/packages/editor-kit/src/features/icons/IconProviderPlugin.ts) and [LabelsPlugin](https://github.com/mpkelly/react-editor-kit/blob/master/packages/editor-kit/src/features/i18n/LabelPlugin.ts). These plugins can be overridden by passing a plugin with same name to `<EditorKit plugins={[...]}>`. You'll need to do this override the built-in icons and text used

### Actions

[Actions](https://github.com/mpkelly/react-editor-kit/blob/master/packages/editor-kit/src/features/actions/Action.tsx) perform specfic tasks, such as changing the font weight to bold or changing the font-family. Actions don't render anything other than the children they are passed. The action interface looks as follows:

```TypeScript
export interface ActionProps {
  children: JSX.Element;
  onMouseDown(event?: ReactMouseEvent<HTMLElement, MouseEvent>): void;
  isActive(): boolean;
  disabled?: boolean;
}

```

If you're using an icon font then you will probably not need to worry about Actions and instead use some of the dedicated buttons, such as [BoldButton](https://github.com/mpkelly/react-editor-kit/blob/master/packages/editor-kit/src/features/bold/BoldButton.tsx), which is already using the `BoldAction` internally. However, if you are using SVG icons or want to use the bold action somewhere else, such as a menu, then you would need to use the [BoldAction](https://github.com/mpkelly/react-editor-kit/blob/master/packages/editor-kit/src/features/bold/BoldAction.tsx) instead of the `BoldButton` as shown below.

```TypeScript
const MyBoldButton = () => {
  return (
    <BoldAction>
      <svg
        ...
      >
       ...
      </svg>
      );
    </BoldAction>
  );
};

```

**NOTE** As Action passes the props to the child element below you will need to ensure these props are passed down to the root JSX tag of your component.

**NOTE: THIS DOES NOT WORK**

```TypeScript
const BoldSvgIcon = () => {
  return (
    <svg
        ...
      >
        ...
      </svg>
      );
  )
}

const MyBoldButton = () => {
  return (
    <BoldAction>
      <BoldSvgIcon />
    </BoldAction>
  );
};
```

You can fix the above code like so:

```TypeScript
const BoldSvgIcon = (props:ActionChildProps) => {
  return (
    <svg      
        ...
        {...props} //important
      >
        ...
      </svg>
      );
  )
}

const MyBoldButton = () => {
  return (
    <BoldAction>
      <BoldSvgIcon />
    </BoldAction>
  );
};
```

### Buttons and other controls

Toolbar buttons and select boxes are provided. The button components, such as [BoldButton](https://github.com/mpkelly/react-editor-kit/blob/master/packages/editor-kit/src/features/bold/BoldButton.tsx), accept properties for the CSS className for your icon font icon and optional a ligature. Here's how you would declare you buttons with and without ligatures:

**Font Awesome - no ligature**

```TypeScript
// <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

<BoldButton className="fas fa-bold" />
```

**Material Icons Round - ligature**

```TypeScript
// <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons+Round">

<BoldButton className="material-icons-round" ligature="format_bold" />

```

Editor Kit also includes `Select` controls which can be included similarly to `Buttons`.

```TypeScript
    <EditorKit plugins={plugins}>
        <EditorToolbar>
          <HeadingSelect />
          <Divider />
          <FontSelect />
          <Divider />
          <FontSizeSelect />
          ...
```

### Toolbars

There are two built-in `Toolbars` which are both optional. It's fine to use your own toolbar or just a regular `div` to group your controls, so long as they are inside of the `<EditorKit>` scope.

[EditorToolbar](https://github.com/mpkelly/react-editor-kit/blob/master/packages/editor-kit/src/features/toolbar/EditorToolbar.tsx)

This toolbar supports overflow which is the main reason you would use it over a regular `div`. There are two strategies supported:

- Menu: show the controls that don't fit in popup menu
- Wrap: wrap the toolbar over multiple lines so that all controls are always visible

```TypeScript
export interface EditorToolbarProps {
    children: JSX.Element[];
    className?: string;
    overflowStrategy?: OverflowStrategy;
    style?: CSSProperties;
}
export declare enum OverflowStrategy {
    Wrap = 0,
    Menu = 1 // default
}

```

You can see this toolbar in use [here](https://github.com/mpkelly/react-editor-kit/blob/master/packages/examples/src/googledocs/GoogleDocsEditor.tsx) and use it in your own project like so:

```TypeScript
<EditorKit plugins={plugins}>
  <EditorToolbar>
    <HeadingSelect />
    <Divider />
    <FontSelect />
    <Divider />
    <FontSizeSelect />
    <Divider />
    <BoldButton className="material-icons-round" ligature="format_bold" />
    ...
  </EditorToolbar>
  ...
</EditorKit>
```

[SelectionToolbar](https://github.com/mpkelly/react-editor-kit/blob/master/packages/editor-kit/src/features/toolbar/SelectionToolbar.tsx)

The SelectionToolbar is shown as the user selects text inside the editor. [Medium](https://medium.com/) is one reason this type of floating toolbar became popular. You can see it being used [here](https://github.com/mpkelly/react-editor-kit/blob/master/packages/examples/src/googledocs/GoogleDocsEditor.tsx) and use it in your own project like so:

```TypeScript
<EditorKit plugins={plugins}>
  <SelectionToolbar>
    <BoldButton className="material-icons-round" ligature="format_bold" />
    <ItalicButton
      className="material-icons-round"
      ligature="format_italic"
    />
    <LinkButton className="material-icons-round" ligature="link" />
    <StrikethroughButton
      className="material-icons-round"
      ligature="format_strikethrough"
    />
  </SelectionToolbar>
  ...
<EditorKit>
```
