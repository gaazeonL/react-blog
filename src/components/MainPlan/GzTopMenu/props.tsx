//redux引入
import { useSelector, useDispatch } from "react-redux";
// import { changeKeyPath } from "@store/system";
import { storeType } from "@store/type";
//react-router引入
import { useNavigate } from "react-router-dom";
//全局方法引入
import jsonDeepCopy from "@utils/jsonDeepCopy";
import keyPathToURL from "@utils/keyPathToURL";
//组件内部引入
import { MenuProps, TopMenuProps } from "./type";
import { singeMenu } from "../GzSiderBar/GzSiderMenu/type";
import { ItemType } from "antd/lib/menu/hooks/useItems";
/*------------------------------------------------------------------------------
以上为引用层
------------------------------------------------------------------------------*/
export const getMenuProps = () => {
  const navigate = useNavigate();
  const menu = useSelector<storeType, singeMenu[]>(
    (state) => state.system.menuControl.data
  );
  const selectedKeys = useSelector<storeType, string[]>(
    (state) => state.system.globalControl.keyPath
  );
  const isShort = useSelector<storeType, boolean>(
    (state) => state.system.globalControl.isShort
  );
  // const dispatch = useDispatch();
  let items = menuRemoveIcon(menu) as ItemType[];
  //点击菜单事件
  const onClick: MenuProps["onClick"] = (e) => {
    // dispatch(changeKeyPath(e.keyPath));
    navigate(keyPathToURL(e.keyPath, items as singeMenu[]));
  };
  const menuProps: TopMenuProps = {
    items,
    onClick,
    selectedKeys,
    defaultSelectedKeys: selectedKeys,
    mode: "horizontal",
    "sub-props": {
      isShort,
    },
  };
  return menuProps;
};
//去除图标标签版本menu
function menuRemoveIcon(newMenu: singeMenu[]) {
  let items = jsonDeepCopy(newMenu) as singeMenu[];
  function _menuRemoveIcon(_items: singeMenu[], parent?: singeMenu) {
    for (let i = _items.length - 1; i >= 0; i--) {
      //去掉非指定类型的项目，只能倒叙遍历，正序遍历会删不完
      let item = _items[i];
      if (item.type !== 1 && parent) {
        parent.children?.splice(i, 1);
        if (parent.children?.length === 0) {
          delete parent.children;
        }
      }
      item.children && _menuRemoveIcon(item.children, item);
      item.icon && delete item.icon;
    }
  }
  _menuRemoveIcon(items);
  items = items.filter((item) => item.type === 1);
  return items;
}
