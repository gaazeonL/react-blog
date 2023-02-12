//styled-components引用
import styled from "styled-components";
export default styled("div")`
  height: 100%;
  & .project-introduction {
    height: 100px;
    padding-left: 20px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  & .project-introduction span {
    margin: 10px;
  }
`;
