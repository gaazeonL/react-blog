export type { ButtonProps } from "antd/lib/button";
export type { SwitchProps } from "antd/lib/switch";
export type { DropdownProps } from "antd/lib/dropdown";
export type { TooltipProps } from "antd/lib/tooltip";
export type SwitchChangeEventHandler = (
  checked: boolean,
  event: React.MouseEvent<HTMLButtonElement>
) => void;
interface MenuInfo {
  key: string;
  keyPath: string[];
  /** @deprecated This will not support in future. You should avoid to use this */
  item: React.ReactInstance;
  domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}
export type MenuClickEventHandler = (info: MenuInfo) => void;
export type styleHeaderProps = {
  "sub-props": {
    isMoveMode: boolean;
    isCollapse: boolean;
    menuWidth: number;
  };
};
export type FromFatherProps = {};
