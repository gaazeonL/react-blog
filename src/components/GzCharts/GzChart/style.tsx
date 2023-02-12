//styled-components引用
import styled from "styled-components";
export const ZoomCloackStyle = styled("div")`
  @media screen and (min-width: 1001px) {
    & {
      width: 100%;
    }
  }
  @media screen and (max-width: 1000px) {
    & {
      width: 1000px;
    }
  }
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  z-index: 100;
`;
export const ZoomChartStyle = styled("div")`
  @media screen and (min-width: 1001px) {
    & {
      top: 50%;
      left: 50%;
      transform: translate(-500px, -500px);
    }
  }
  @media screen and (max-width: 1000px) {
    & {
      top: 0;
      left: 0;
    }
  }
  width: 1000px;
  height: 1000px;
  z-index: 101;
  background-color: white;
  border-radius: 15px;
  position: absolute;
  & canvas {
    border-radius: 15px;
  }
`;
export const ZoomButtonStyle = styled("div")`
  display: flex;
  height: 32px;
  margin: 10px;
  /* background-color: whitesmoke; */
  z-index: 102;
  position: fixed;
  top: 0;
  right: 0;
  flex-direction: row-reverse;
`;
export default styled("div")``;
