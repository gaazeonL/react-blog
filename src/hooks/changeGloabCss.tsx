import { useSelector } from "react-redux";
import { storeType } from "@store/type";
export default () => {
  const theme = useSelector<storeType, boolean>(
    (state) => state.system.globalControl.theme
  );
  let dom = document.getElementById(`change-theme`) as HTMLStyleElement | null;
  const lightCss = `
    .ant-dropdown .ant-dropdown-menu {
      background-color: #fff;
    }
    .ant-dropdown .ant-dropdown-menu .ant-dropdown-menu-item {
      color: rgba(0, 0, 0, 0.85);
    }
    .ant-dropdown .ant-dropdown-menu .ant-dropdown-menu-item:hover {
      background-color: #f5f5f5;
    }
  `;
  const darkCss = `
    .ant-dropdown .ant-dropdown-menu {
      background-color: rgb(80, 80, 80);
    }
    .ant-dropdown .ant-dropdown-menu .ant-dropdown-menu-item {
      color: white;
    }
    .ant-dropdown .ant-dropdown-menu .ant-dropdown-menu-item:hover {
      background-color: rgb(150, 150, 150);
    }
  `;
  if (!dom) {
    dom = document.createElement("style");
    dom.id = "change-theme";
    document.getElementsByTagName("head")[0].appendChild(dom);
  }
  theme ? (dom.innerHTML = lightCss) : (dom.innerHTML = darkCss);
};
