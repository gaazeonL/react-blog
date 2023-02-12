import { MenuProps } from "antd/lib/menu";
export type { MenuProps } from "antd/lib/menu";
export type TopMenuProps =
  | MenuProps & {
      "sub-props": {
        isShort: boolean;
      };
    };
