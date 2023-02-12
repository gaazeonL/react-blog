//react引入
import { useRef } from "react";
//redux引入
import { useDispatch, useSelector } from "react-redux";
import { storeType } from "@store/type";
import { changeCollapse } from "@store/system";
//组件内部引入
import { GetPropsFn } from "@utils/type";
import { FromFatherProps, CloackPropsType } from "./type";
/*------------------------------------------------------------------------------
以上为引用层
------------------------------------------------------------------------------*/
//合成Cloack的props
export const getCloackProps: GetPropsFn<FromFatherProps, CloackPropsType> = (
  props
) => {
  const dispatch = useDispatch();
  //从redux获取数据
  const isMoveMode = useSelector<storeType, boolean>(
    (state) => state.system.globalControl.isMoveMode
  );
  const isCollapse = useSelector<storeType, boolean>(
    (state) => state.system.siderBarControl.isCollapse
  );
  const cloackRef = useRef<HTMLDivElement>(null);
  return {
    ref: cloackRef,
    onClick: () => {
      dispatch(changeCollapse(!isCollapse));
    },
    isMoveMode,
    isCollapse,
  };
};
