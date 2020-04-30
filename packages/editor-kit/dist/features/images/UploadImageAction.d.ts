import { FunctionComponent, ReactNode } from "react";
export interface UploadImageActionProps {
    children: ReactNode;
    extensions?: string[];
}
export declare const UploadImageAction: FunctionComponent<UploadImageActionProps>;
export interface UseUploadValue {
    openFileBrowser(): void;
}
export declare const useUpload: (onFiles: (files: File[]) => void, extensions: string[]) => UseUploadValue;
