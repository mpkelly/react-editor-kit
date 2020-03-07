import { Editor } from "slate";
import { MatchResult } from "../../editor/Matching";
import { ReactEditor } from "slate-react";
export declare const toggleMark: (editor: Editor, type: string, value?: boolean) => void;
export declare const isMarkActive: (editor: Editor, type: string) => boolean;
export declare const marks: (editor: Editor) => {
    key: string;
    value: any;
}[];
export declare const applyRegexMark: (editor: ReactEditor, result: MatchResult, mark: string, value?: boolean) => void;
