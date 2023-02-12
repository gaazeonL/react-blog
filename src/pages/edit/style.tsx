import changeEditorTheme from "@hooks/changeEditorTheme";
import changTheme from "@hooks/changTheme";
import styled from "styled-components";

export const TitleDiv = styled("div")`
  padding: 10px;
`;

export const EditDiv = styled("div")`
  ${changeEditorTheme}
  z-index: 100;
  padding: 10px;
  & .toolbar {
    margin-bottom: 10px;
  }
  & .toolbar > div,
  & .editor > div {
    animation: gz-editor-start 0.5s ease;
    @keyframes gz-editor-start {
      0% {
        opacity: 0;
      }
      50% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
  & .w-e-text-container {
    /* min-height:100%; */
  }
  & .w-e-text-container [data-slate-editor] pre > code {
    text-shadow: none;
  }
  & .w-e-scroll::-webkit-scrollbar {
    width: 10px;
    height: 8px;
    ${changTheme("background-color", true, "whitesmoke", "#202124")}
  }
  & .w-e-scroll::-webkit-scrollbar-thumb {
    ${changTheme("background-color", false, "#bf5e5a", "#202124")}
  }
  & .w-e-scroll::-webkit-scrollbar-track {
    ${changTheme("background-color", true, "#ffffff", "#292a2d")}
  }
`;
export const ButtonBar = styled("div")`
  padding-top: 20px;
  display: flex;
  flex-direction: row-reverse;
  & button {
    margin: 0 10px;
  }
`;
