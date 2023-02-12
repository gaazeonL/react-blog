//redux引入
import { useSelector } from "react-redux";
import { storeType } from "@store/type";
//组件内部引入
import { getContentPropsFn } from "./type";
/*------------------------------------------------------------------------------
以上为引用层
------------------------------------------------------------------------------*/
export const getContentProps: getContentPropsFn = () => {
  const isCollapse = useSelector<storeType, boolean>(
    (state) => state.system.siderBarControl.isCollapse
  );
  const isMoveMode = useSelector<storeType, boolean>(
    (state) => state.system.globalControl.isMoveMode
  );
  const isShort = useSelector<storeType, boolean>(
    (state) => state.system.globalControl.isShort
  );
  return {
    "sub-props": {
      isCollapse,
      isMoveMode,
      isShort,
    },
  };
};
