//react引入
import { useRef } from "react";
//redux引入
import { useDispatch, useSelector } from "react-redux";
import { storeType } from "@store/type";
import { changeCollapse, changeMoveMode } from "@store/system";
//全局方法引入
import { GetPropsFn } from "@utils/type";
//组件内部引入
import {
  FromFatherProps,
  SiderProps,
  typeOnBreakpointCallBack,
  typeOnCollapseCallBack,
} from "./type";
/*------------------------------------------------------------------------------
以上为引用层
------------------------------------------------------------------------------*/
//合成SiderBar的props
export const getSiderBarProps: GetPropsFn<FromFatherProps, SiderProps> = (
  props
) => {
  const dispatch = useDispatch();
  const siderRef = useRef<HTMLDivElement>(null);
  const isCollapse = useSelector<storeType, boolean>(
    (state) => state.system.siderBarControl.isCollapse
  );
  const menuWidth = useSelector<storeType, number>(
    (state) => state.system.menuControl.width
  );
  const onCollapseCallBack: typeOnCollapseCallBack = (collapsed, type) => {
    dispatch(changeCollapse(collapsed));
  };
  const onBreakpointCallBack: typeOnBreakpointCallBack = (broken) => {
    dispatch(changeMoveMode(broken));
  };
  return {
    ref: siderRef,
    width: menuWidth,
    breakpoint: "md",
    collapsedWidth: 0,
    collapsible: true,
    trigger: null,
    collapsed: isCollapse,
    onCollapse: onCollapseCallBack,
    onBreakpoint: onBreakpointCallBack,
    "move-mode": {
      value: useSelector<storeType, boolean>(
        (state) => state.system.globalControl.isMoveMode
      ),
    },
  };
};
