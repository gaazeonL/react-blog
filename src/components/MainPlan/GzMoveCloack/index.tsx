//react引入
import { memo } from "react";
//组件内部引入
import { FromFatherProps } from "./type";
import StyleCloack from "./style";
import { getCloackProps } from "./props";
/*------------------------------------------------------------------------------
以上为引用层
------------------------------------------------------------------------------*/
export default memo(function GzMoveCloack(props: FromFatherProps) {
  //合成Cloack的props
  const CloackProps = getCloackProps(props);
  return <StyleCloack {...CloackProps}></StyleCloack>;
});
