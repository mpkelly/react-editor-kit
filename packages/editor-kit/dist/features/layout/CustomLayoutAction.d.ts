/// <reference types="react" />
import { ActionProps } from "../actions/Action";
export interface CustomLayoutActionProps extends Partial<ActionProps> {
}
export declare const CustomLayoutAction: (props: CustomLayoutActionProps) => JSX.Element;
