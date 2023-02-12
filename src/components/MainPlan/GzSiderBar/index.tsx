//react引入
import { memo } from "react";
//子组件引入
import GzSiderCard from "./GzSiderCard";
import GzSiderMenu from "./GzSiderMenu";
//组件内部引入
import { getSiderBarProps } from "./props";
import StyleSiderBar from "./style";
import { FromFatherProps } from "./type";
/*------------------------------------------------------------------------------
以上为引用层
------------------------------------------------------------------------------*/
export default memo(function GzSiderBar(props: FromFatherProps) {
  //合成SiderBar的props
  const SiderBarProps = getSiderBarProps(props);
  return (
    <StyleSiderBar {...SiderBarProps}>
      <GzSiderCard />
      <GzSiderMenu />
    </StyleSiderBar>
  );
});
