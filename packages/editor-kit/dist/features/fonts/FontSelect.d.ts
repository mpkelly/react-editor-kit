import { FunctionComponent } from "react";
import { TooltipContentProps } from "../popup/Tooltip";
export interface FontSelectProps extends TooltipContentProps {
    fonts?: EditorFont[];
}
export declare const FontSelect: FunctionComponent<FontSelectProps>;
export declare const DefaultFonts: EditorFont[];
export interface EditorFont {
    name: string;
    fontFamily: string;
}
