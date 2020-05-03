import { RenderElementProps } from "slate-react";
import { Trigger } from "../../plugins/Trigger";

export interface Suggestions {
  getSuggestions(match: string): Promise<any[]>;
  renderChoice(choice: any): any;
  triggers: Trigger[];
  renderSuggestion(props: RenderElementProps): JSX.Element;
  renderLoading?(): any;
}
