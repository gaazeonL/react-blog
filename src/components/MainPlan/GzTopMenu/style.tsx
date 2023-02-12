//styled-components的引用
import styled from "styled-components";
//antd引用
import Menu from "antd/lib/menu";
import { TopMenuProps } from "./type";
export default styled(Menu)<TopMenuProps>`
  &&& {
    padding-top: 64px;
    display: ${(props) => (props["sub-props"].isShort ? "flex;" : "none;")};
    justify-content: space-around;
    &::before {
      content: none;
    }
    &::after {
      content: none;
    }
  }
`;
