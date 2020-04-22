import React from "react";
import { Trigger } from "../../plugins/Plugin";
import { RenderElementProps } from "slate-react";
export interface Mention {
    name: string;
    imageUrl?: string;
    subText?: string;
}
export interface StaticMentionOptions {
    mentions: Mention[];
    triggers?: Trigger[];
}
export declare const DefaultTriggers: Trigger[];
export declare const createStaticMentions: (options: StaticMentionOptions) => import("../../plugins/Plugin").Plugin;
export interface MentionChoiceProps {
    choice: Mention;
}
export declare const MentionChoice: React.MemoExoticComponent<(props: MentionChoiceProps) => JSX.Element>;
export declare const MentionElement: (props: RenderElementProps) => JSX.Element;
export declare const GlobalStyle = "\n  .rek-mention-choice {\n    display:flex;\n    align-items:center;\n    padding:4px;\n    \n    img {\n      border-radius:50%;\n      height:30px;\n      width:30px;\n      margin-right:16px;\n    } \n\n    .rek-mention-subtext {\n      margin-left:8px;\n      color:var(--secondary-text-color);\n      font-size:smaller;\n    }\n  }\n";
export declare const EditorStyle = "\n  .rek-mention {\n    display:inline-flex;\n    background-color: var(--color-divider);\n    padding: 1px 2px;\n    border-radius: 3px;\n  }\n";
