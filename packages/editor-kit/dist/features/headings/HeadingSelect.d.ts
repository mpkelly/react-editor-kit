import { FunctionComponent } from "react";
import { TooltipContentProps } from "../popup/Tooltip";
export interface HeadingSelectProps extends TooltipContentProps {
    types?: {
        type: string;
        name: string;
    }[];
}
export declare const HeadingSelect: FunctionComponent<HeadingSelectProps>;
export declare const DefaultTypes: {
    type: string;
    name: string;
}[];
