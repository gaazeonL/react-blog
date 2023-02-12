//react引入
import { memo } from "react";
//组件内部引入
import StyleContent from "./style";
import { getContentProps } from "./props";
//路由引入
import GetRoutes from "@router/index";

/*------------------------------------------------------------------------------
以上为引用层
------------------------------------------------------------------------------*/
const GzContent = memo(() => {
  const ContentProps = getContentProps();
  return (
    <StyleContent {...ContentProps}>
      <GetRoutes></GetRoutes>
    </StyleContent>
  );
});
export default GzContent;
