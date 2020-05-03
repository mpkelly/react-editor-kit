import { Transforms, Range, Editor } from "slate";
import { isElementActive } from "../blocks/Elements";
import { PluginAction } from "../../plugins/PluginAction";

export const LinkPluginAction: PluginAction = {
  action: ({ editor }) => {
    if (isElementActive(editor, "link")) {
      const [] = Editor.nodes(editor, {
        match: (n) => n.type === "link",
      });
      Transforms.setNodes(
        editor,
        { editing: true },
        { at: editor.selection as Range }
      );
    } else {
      const { selection } = editor;
      const isExpanded = selection && Range.isExpanded(selection);
      const link = {
        type: "link",
        url: "",
        editing: true,
        children: isExpanded ? [] : [{ text: "" }],
      };

      if (isExpanded) {
        //Track bug https://github.com/ianstormtaylor/slate/issues/3454
        (Transforms.wrapNodes as any)(editor, link, {
          at: selection as Range,
          split: true,
          hanging: false,
        });
        Transforms.collapse(editor, { edge: "end" });
      } else {
        Transforms.insertNodes(editor, link);
      }
    }
  },
  isActionActive: ({ elementType }) => elementType === "link",
};
