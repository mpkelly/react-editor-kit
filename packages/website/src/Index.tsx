import React from "react";
import ReactDOM from "react-dom";
import { Intro } from "./features/intro/Intro";
import { Website } from "./ui/Website";
import { Nav } from "./features/nav/NavBar";
import { Faq } from "./features/faq/Faq";
import { Plugins } from "./features/plugins/Plugins";

const App = () => {
  return (
    <Website>
      <Nav />
      <Intro />
      <Plugins />
      <Faq />
    </Website>
  );
};

ReactDOM.render(<App />, document.body);
