/// <reference types="react" />
export interface FontSelectProps {
    fonts?: EditorFont[];
}
export declare const FontSelect: (props: FontSelectProps) => JSX.Element;
export interface EditorFont {
    name: string;
    fontFamily: string;
}
export declare const DefaultFonts: EditorFont[];
