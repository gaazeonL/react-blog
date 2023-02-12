//styled-components引入
import styled from "styled-components";
//redux引入
import { useSelector } from "react-redux";
import { storeType } from "@store/type";
//antd引入
import Card from "antd/lib/card";
/*------------------------------------------------------------------------------
以上为引用层
------------------------------------------------------------------------------*/
export default styled(Card)`
  &&& {
    width: ${() => {
      const menuWidth = useSelector<storeType, number>(
        (state) => state.system.menuControl.width
      );
      return menuWidth + "px";
    }};
    margin-top: 50px;
    box-shadow: none;
    transform: ${() => {
      const menuWidth = useSelector<storeType, number>(
        (state) => state.system.menuControl.width
      );
      const isCollapse = useSelector<storeType, boolean>(
        (state) => state.system.siderBarControl.isCollapse
      );
      if (isCollapse) {
        return `translateX(-${menuWidth}px)`;
      } else {
        return `translateX(0px)`;
      }
    }};
    transition: transform 0.2s ease;
  }
`;
