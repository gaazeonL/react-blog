import { useSelector } from "react-redux";
import { storeType } from "@store/type";
export default (
  name: string,
  revers: boolean = false,
  lightColor: string = "#292a2d",
  darkColor: string = "rgb(255, 255, 255)"
) => {
  return function () {
    const theme = useSelector<storeType, boolean>(
      (state) => state.system.globalControl.theme
    );
    return revers
      ? theme
        ? `${name}: ${lightColor};`
        : `${name}: ${darkColor};`
      : theme
      ? `${name}: ${darkColor};`
      : `${name}: ${lightColor};`;
  };
};
