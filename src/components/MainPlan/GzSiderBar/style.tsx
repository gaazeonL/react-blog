//styled-components的引入
import styled from "styled-components";
//antd引入
import Layout from "antd/lib/layout";
//全局方法的引入
import changeTheme from "@hooks/changTheme";
//内部类型引入
import { SiderProps } from "./type";
/*------------------------------------------------------------------------------
以上为引用层
------------------------------------------------------------------------------*/
export default styled(Layout.Sider)<SiderProps>`
  &&& {
    ${changeTheme("background-color")}
    box-shadow: ${(props) => {
      if (!props.collapsed && !props["move-mode"].value) {
        //移动模式不要阴影，并且桌面模式非打开不要阴影
        return "1px 0px 1px rgb(240, 240, 240)";
      } else {
        return "";
      }
    }};
    height: 100vh;
    position: fixed;
    z-index: 100;
  }
`;
