//react引用
import { memo } from "react";
//组件内部引用
import { FromFatherProps } from "./type";
import StyleMenu from "./style";
import { getMenuProps } from "./props";
/*------------------------------------------------------------------------------
以上为引用层
------------------------------------------------------------------------------*/
export default memo(function GzSiderMenu(props: FromFatherProps) {
  //合成Menu的props
  const MenuProps = getMenuProps(props);
  //如果items是个空数组，菜单就没不要渲染了
  // return MenuProps.items?.length !== 0 ? <StyleMenu {...MenuProps} /> : <></>;
  return <StyleMenu {...MenuProps} />
});
