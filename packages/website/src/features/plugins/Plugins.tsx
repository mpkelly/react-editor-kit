import React from "react";
import styled from "styled-components";
import { Section } from "../../ui/Section";
import { XLargeText } from "../../ui/Text";
import { Theme } from "../../ui/Theme";
import { Plugin } from "./Plugin";

export const Plugins = () => {
  return (
    <PluginsContent>
      <XLargeText className="center light-text" id="plugins">
        Plugins
      </XLargeText>
      <div className="plugins">{plugins.map(Plugin)}</div>
    </PluginsContent>
  );
};

export const PluginsContent = styled(Section)`
  min-height: 100vh;
  background-color: ${Theme.backgroundColor};
  .divider {
    path {
      fill: ${Theme.primaryColor};
    }
  }
  #plugins {
    margin-bottom: 100px;
  }
  .plugins {
    width: 100%;
    max-width: 1000px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

const plugins = [
  {
    title: "Bold ",
    icon: "format_bold"
  },
  {
    title: "Italic ",
    icon: "format_italic"
  },
  {
    title: "Strikethrough ",
    icon: "format_strikethrough"
  },
  {
    title: "Underline ",
    icon: "format_underlined"
  },
  {
    title: "Code ",
    icon: "code"
  },
  {
    title: "Text Alignment",
    icon: "format_align_center"
  },
  {
    title: "Mentions",
    icon: "alternate_email"
  },
  {
    title: "Images",
    icon: "image"
  },
  {
    title: "Video",
    icon: "videocam"
  },
  {
    title: "Tables",
    icon: "grid_on"
  },
  {
    title: "Lists",
    icon: "format_list_numbered"
  },
  {
    title: "Font Styling",
    icon: "style"
  },
  {
    title: "Spoilers",
    icon: "error"
  },
  {
    title: "Superscript",
    icon: (
      <span>
        X<sup>2</sup>
      </span>
    )
  },
  {
    title: "Subscript",
    icon: (
      <span>
        X<sub>2</sub>
      </span>
    )
  },
  {
    title: "Headings",
    icon: "title"
  },
  {
    title: "Text Color",
    icon: "text_format"
  },
  {
    title: "Alerts",
    icon: "warning"
  }
];
