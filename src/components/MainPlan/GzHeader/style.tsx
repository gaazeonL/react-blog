//styled-components引入
import styled from "styled-components";
//antd引入
import Layout from "antd/lib/layout";
//全局方法引入
import changeTheme from "@hooks/changTheme";
//组件内部引入
import { styleHeaderProps } from "./types";
/*------------------------------------------------------------------------------
以上为引用层
------------------------------------------------------------------------------*/
export default styled(Layout.Header) <styleHeaderProps>`
  &&& {
    ${changeTheme("background-color")}
    & .flex-item {
      display: flex;
      ${(props) => {
        return props["sub-props"].isMoveMode
          ? props["sub-props"].isCollapse
            ? `animation: gz-right-item 1s ease;`
            : `display:none;`
          : props["sub-props"].isCollapse
            ? ``
            : `margin-left:${props["sub-props"].menuWidth}px;`;
      }};
    }
    @keyframes gz-right-item {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    width: 100%;
    padding: 0px 20px 0px 20px;
    position: fixed;
    top: 0px;
    z-index: 97;
    box-shadow: inset 0px -2px 2px -1px rgb(200 200 200);
    & .left-item {
      min-width: 45px;
      flex: 1;
    }
    & .middle-item {
      height: 64px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      flex: 11;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    & .right-item {
      min-width: 200px;
    }
  }
`;
