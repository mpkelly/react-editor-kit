import { FunctionComponent } from "react";
import { TooltipContentProps } from "../../popup/Tooltip";
export interface FontSizeSelectProps extends TooltipContentProps {
    fontSizes?: number[];
}
export declare const FontSizeSelect: FunctionComponent<FontSizeSelectProps>;
export declare const DefaultFontSizes: number[];
