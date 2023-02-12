//react引入
import React, { memo } from "react";
//组件内部引入
import StyleGZTopMenu from "./style";
import { getMenuProps } from "./props";
const GZTopMenu = memo(() => {
  const MenuProps = getMenuProps();
  return <>
    {/* 如果菜单items还没获取直接不渲染 */}
    {MenuProps.items?.length !== 0 ? <StyleGZTopMenu {...MenuProps} /> : <></>}
  </>;
});
export default GZTopMenu;
