import changTheme from "@hooks/changTheme";
import styled from "styled-components";

export const TitleDiv = styled("div")`
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
`;

export const ContentDiv = styled("div")`
  ${changTheme("background-color", true, "white", "#35363a")}
  ${changTheme("color", false, "white", "#000000")}
  width:95%;
  min-height: 1080px;
  padding: 20px;
  margin: 0 auto;
  overflow: scroll;
  word-wrap: break-word;
  &::-webkit-scrollbar {
    width: 10px;
    height: 8px;
    ${changTheme("background-color", true, "whitesmoke", "#202124")}
  }
  &::-webkit-scrollbar-thumb {
    ${changTheme("background-color", false, "#bf5e5a", "#202124")}
  }
  &::-webkit-scrollbar-track {
    ${changTheme("background-color", true, "#ffffff", "#292a2d")}
  }
`;
