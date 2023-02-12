import type { Locale } from "antd/lib/locale-provider";
export type singeMenu = {
  [X: string]: any;
  id: number;
  type: number;
  key: string;
  icon?: any;
  url?: string;
  label?: string;
  component?: string;
  children?: singeMenu[];
};
export type textType = {
  [X: string]: {
    sider: {
      menu: {
        [X: string]: string;
        read: string;
        write: string;
        experiment: string;
        aboutme: string;
        game1: string;
        game2: string;
      };
    };
  };
};
export type systemState = {
  globalControl: {
    token: string;
    theme: boolean;
    isMoveMode: boolean;
    isShort: boolean;
    language: string | null;
    languagePack: Locale | null;
    keyPath: string[];
  };
  siderBarControl: {
    isCollapse: boolean;
  };
  menuControl: {
    width: number;
    height: number;
    data: singeMenu[];
  };
  text: textType;
};
