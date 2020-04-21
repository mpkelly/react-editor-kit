/// <reference types="react" />
import { Location, Offsets } from "../popup/Popups";
export interface SelectionToolbarProps {
    children: JSX.Element[];
    location?: Location;
    offsets?: Offsets;
    delay?: number;
}
export declare const SelectionToolbar: (props: SelectionToolbarProps) => JSX.Element;
