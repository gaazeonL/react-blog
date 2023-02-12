export interface antdSiderProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  collapsible?: boolean;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  reverseArrow?: boolean;
  onCollapse?: (collapsed: boolean, type: CollapseType) => void;
  zeroWidthTriggerStyle?: React.CSSProperties;
  trigger?: React.ReactNode;
  width?: number | string;
  collapsedWidth?: number | string;
  breakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  theme?: "light" | "dark";
  onBreakpoint?: (broken: boolean) => void;
}
export type CollapseType = "clickTrigger" | "responsive";
export type FromFatherProps = {};
export type SiderProps =
  | antdSiderProps & {
      "move-mode": {
        value: boolean;
      };
    };
export type typeOnCollapseCallBack = (
  collapsed: boolean,
  type: CollapseType
) => void;
export type typeOnBreakpointCallBack = (broken: boolean) => void;
