import React from "react";
import ReactDOM from "react-dom";
import { PositioningExample } from "./positioning/PositioningExample";
import { GoogleDocsEditor } from "./googledocs/GoogleDocsEditor";
import { RedditEditor } from "./reddit/RedditEditor";

const App = () => {
  return (
    <div className="page">
      <GoogleDocsEditor />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
