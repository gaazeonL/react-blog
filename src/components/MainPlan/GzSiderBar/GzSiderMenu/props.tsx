//react引入，需要根据图标变成vnode
import React, { useEffect } from "react";
//redux引用
import { useDispatch, useSelector } from "react-redux";
import { storeType } from "@store/type";
import { changeCollapse } from "@store/system";
//react-router引入
import { useNavigate } from "react-router-dom";
//antd引入
import * as icons from "./icons";
import { ItemType } from "antd/lib/menu/hooks/useItems";
//全局方法引入
import jsonDeepCopy from "@utils/jsonDeepCopy";
import keyPathToURL from "@utils/keyPathToURL";
//组件内部引入
import { GetPropsFn } from "@utils/type";
import { FromFatherProps, MenuProps, singeMenu } from "./type";

// import { useLocation } from "react-router-dom";

/*------------------------------------------------------------------------------
以上为引用层
------------------------------------------------------------------------------*/
//合成Menu的Props
export const getMenuProps: GetPropsFn<FromFatherProps, MenuProps> = (props) => {
  // const location = useLocation();
  // useEffect(() => {
  //   // const fristPath = location.pathname.split("/").reverse();
  //   // fristPath.pop();
  //   // console.log(fristPath);
  //   // dispatch(changeKeyPath(fristPath));
  // }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menu = useSelector<storeType, singeMenu[]>(
    (state) => state.system.menuControl.data
  );
  const selectedKeys = useSelector<storeType, string[]>(
    (state) => state.system.globalControl.keyPath
  );
  const isMoveMode = useSelector<storeType, boolean>(
    (state) => state.system.globalControl.isMoveMode
  );
  const items = iconMenu(menu) as ItemType[];
  //点击菜单事件
  const onClick: MenuProps["onClick"] = (e) => {
    if (isMoveMode) {
      setTimeout(() => {
        dispatch(changeCollapse(true));
      }, 100);
    }
    // dispatch(changeKeyPath(e.keyPath));
    navigate(keyPathToURL(e.keyPath, items as singeMenu[]));
  };
  return {
    selectedKeys,
    onClick,
    defaultSelectedKeys: selectedKeys,
    mode: "inline",
    items,
  };
};
/*-------------------------------组件内部方法----------------------------------------*/
//转换menu的icon
function iconMenu(menu: singeMenu[]) {
  menu = jsonDeepCopy(menu);
  const _icons = icons as any;
  function _f(_menu: singeMenu[], parent?: singeMenu) {
    for (let i = _menu.length - 1; i >= 0; i--) {
      //去掉非指定类型的项目，只能倒叙遍历，正序遍历会删不完
      let item = _menu[i];
      if ((item.type !== 1 && item.type !== 2)&& parent) {
        parent.children?.splice(i, 1);
        if (parent.children?.length === 0) {
          delete parent.children;
        }
      }
      item.children && _f(item.children, item);
      item.icon ? (item.icon = React.createElement(_icons[item.icon])) : "";
    }
  }
  _f(menu);
  menu = menu.filter((item) => (item.type === 1||item.type === 2));

  return menu;
}
