import React from "react";
import styled from "styled-components";
import { Text, BoldText } from "../../ui/Text";
import { Theme } from "../../ui/Theme";

export interface PluginProps {
  title: string;
  icon: string | JSX.Element;
}

export const Plugin = (props: PluginProps) => {
  const { icon, title } = props;
  return (
    <PluginContent>
      <div className="header">
        {renderIcon(icon)}
        <BoldText className="title light-text">{title}</BoldText>
      </div>
    </PluginContent>
  );
};

const renderIcon = (icon: string | JSX.Element) => {
  if (typeof icon === "string") {
    return <span className="icon material-icons-round">{icon}</span>;
  }
  return <span className={"icon text-icon"}>{icon}</span>;
};

export const PluginContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  background-color: ${Theme.backgroundColor};
  margin-bottom: 32px;

  .header {
    display: flex;
    align-items: center;
  }

  .icon {
    border-radius: 8px;
    width: 40px;
    height: 40px;
    margin-right: 16px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: #1c1b21;
    background-color: ${Theme.primaryColor};
    margin-bottom: 8px;
  }
  .text-icon {
    font-size: 20px;
    font-weight: bold;
  }
`;
