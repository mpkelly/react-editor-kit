import { RenderElementProps } from "slate-react";
import { Trigger } from "../../plugins/Plugin";

export interface Suggestions {
  getSuggestions(match: string): Promise<any[]>;
  renderChoice(choice: any): any;
  triggers: Trigger[];
  displayText(choice: any): string;
  renderSuggestion(props: RenderElementProps): JSX.Element;
  renderLoading?(): any;
}
