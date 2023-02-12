//styled-components引入
import styled from "styled-components";
//内部类型引入
import { CloackPropsType } from "./type";
/*------------------------------------------------------------------------------
以上为引用层
------------------------------------------------------------------------------*/
export default styled.div<CloackPropsType>`
  &&& {
    ${(props) => {
      if (props.isMoveMode && !props.isCollapse) {
        //如果是移动模式并且菜单没有闭合，打开阴影
        return `
          width:${document.body.clientWidth + "px"};
          display:block;
          opacity:1;
        `;
      } else if (!props.isMoveMode || props.isCollapse) {
        //如果是不是移动模式并且菜单闭合，关闭阴影
        return `
          width:0;
          display:none;
          opacity:0;
        `;
      }
    }};
    height: 100vh;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99;
    transition: all 0.2s;
    transition-duration: 0.2s;
    transition-timing-function: ease;
    transition-delay: 0s;
    transition-property: all;
  }
`;
