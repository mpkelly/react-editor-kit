import { FunctionComponent } from "react";
export interface SaveDialogProps {
    value?: string;
    onSave(value?: string): void;
    className?: string;
    placeholderText?: string;
    saveButtonText?: string;
}
export declare const SaveDialog: FunctionComponent<SaveDialogProps>;
