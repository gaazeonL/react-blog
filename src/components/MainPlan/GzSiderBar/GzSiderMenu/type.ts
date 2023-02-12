import { MenuProps } from "antd/lib/menu";
export type { MenuProps } from "antd/lib/menu";
export type { singeMenu, textType } from "@store/system/type";
export type MenuItem = Required<MenuProps>["items"][number];
export type FromFatherProps = {};
