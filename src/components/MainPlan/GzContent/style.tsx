//styled-components引入
import styled from "styled-components";
//antd引入
import Layout from "antd/lib/layout";
//全局hooks引入
import changTheme from "@hooks/changTheme";
//组件内部引入
import { ContentPropsType } from "./type";
/*------------------------------------------------------------------------------
以上为引用层
------------------------------------------------------------------------------*/
export default styled(Layout.Content) <ContentPropsType>`
  &&& {
    ${changTheme("background-color", true, "whitesmoke", "#202124")}
    margin-top: ${(props) => {
    return props["sub-props"].isShort ? "0px;" : "64px;";
  }};
    margin-left: ${(props) => {
    return props["sub-props"].isMoveMode
      ? ""
      : props["sub-props"].isCollapse
        ? ""
        : "260px;";
  }};
    overflow: auto;
  }
  &::-webkit-scrollbar {
    width: 5px;
    height: 8px;
    ${changTheme("background-color", true, "whitesmoke", "#202124")}
  }
  &::-webkit-scrollbar-thumb {
    ${changTheme("background-color", false, "whitesmoke", "#1677ff")}
  }
`;
