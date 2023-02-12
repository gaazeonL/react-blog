//redux引入
import { useDispatch, useSelector } from "react-redux";
import { storeType } from "@store/type";
import { changeTheme, changeCollapse, changeLanguage } from "@store/system";
//引入antd图标
import { ArrowLeftOutlined, BulbOutlined, BulbFilled } from "@ant-design/icons";
//i18n引入
import { useTranslation } from "react-i18next";
//引入全局方法
import scrollTop from "@utils/scrollTop";
//引入组件内部文件
import { GetPropsFn } from "@utils/type";
import {
  SwitchChangeEventHandler,
  MenuClickEventHandler,
  FromFatherProps,
  TooltipProps,
  ButtonProps,
  SwitchProps,
  DropdownProps,
  styleHeaderProps,
} from "./types";
//引入外部type
import { singeMenu } from "../GzSiderBar/GzSiderMenu/type";
/*------------------------------------------------------------------------------
以上为引用层
------------------------------------------------------------------------------*/
//合成展开收缩按钮的props
export const getCollapseBtnProps: GetPropsFn<FromFatherProps, ButtonProps> = (
  props
) => {
  const isCollapse = useSelector<storeType, boolean>(
    (state) => state.system.siderBarControl.isCollapse
  );
  const dispatch = useDispatch();
  return {
    type: "text",
    icon: <ArrowLeftOutlined rotate={isCollapse ? 180 : 0} />,
    size: "large",
    shape: "circle",
    onClick: () => dispatch(changeCollapse(!isCollapse)),
  };
};
//合成返回顶部按钮props
export const getScrollTopBtnProps: GetPropsFn<FromFatherProps, ButtonProps> = (
  props
) => {
  const onClick = () => {
    scrollTop();
  };
  return {
    type: "text",
    icon: <ArrowLeftOutlined rotate={90} />,
    size: "large",
    shape: "circle",
    onClick,
  };
};
//switch按钮的props
export const getThemeSwitchProps: GetPropsFn<FromFatherProps, SwitchProps> = (
  props
) => {
  const dispatch = useDispatch();
  const theme = useSelector<storeType, boolean>(
    (state) => state.system.globalControl.theme
  );
  const onChange: SwitchChangeEventHandler = function (checked, event) {
    dispatch(changeTheme(!theme));
  };
  return {
    checkedChildren: <BulbFilled />,
    unCheckedChildren: <BulbOutlined />,
    defaultChecked: theme,
    onChange,
  };
};
//translate按钮的props
export const getTranslateProps: GetPropsFn<FromFatherProps, DropdownProps> = (
  props
) => {
  const dispatch = useDispatch();
  const items = [
    {
      key: "zh_CN",
      label: (
        <span>
          <i className="fi fi-cn"></i> 简体中文
        </span>
      ),
    },
    {
      key: "zh_HK",
      label: (
        <span>
          <i className="fi fi-hk"></i> 繁體中文
        </span>
      ),
    },
    {
      key: "en_US",
      label: (
        <span>
          <i className="fi fi-us"></i> English
        </span>
      ),
    },
    {
      key: "ja_JP",
      label: (
        <span>
          <i className="fi fi-jp"></i> 日本語
        </span>
      ),
    },
  ];
  const { t, i18n } = useTranslation();
  const onClick: MenuClickEventHandler = (e) => {
    dispatch<any>(changeLanguage(e.key));
    i18n.changeLanguage(e.key);
    
  };
  return {
    placement: "bottom",
    menu: {
      items,
      onClick,
    },
  };
};
//Header的props
export const getStyleHeaderProps: () => styleHeaderProps = () => {
  const isCollapse = useSelector<storeType, boolean>(
    (state) => state.system.siderBarControl.isCollapse
  );
  const isMoveMode = useSelector<storeType, boolean>(
    (state) => state.system.globalControl.isMoveMode
  );
  const menuWidth = useSelector<storeType, number>(
    (state) => state.system.menuControl.width
  );
  return {
    "sub-props": {
      isCollapse,
      isMoveMode,
      menuWidth,
    },
  };
};
export const getTooltipProps: () => TooltipProps = () => {
  const theme = useSelector<storeType, boolean>(
    (state) => state.system.globalControl.theme
  );
  const { t } = useTranslation();
  const title = t("header.g2github");
  const color = theme ? "blue" : "";
  return {
    title,
    placement: "bottom",
    color,
  };
};
export const getBreadcrumbItem = () => {
  const menu = useSelector<storeType, singeMenu[]>(
    (state) => state.system.menuControl.data
  );
  const keyPath = useSelector<storeType, string[]>(
    (state) => state.system.globalControl.keyPath
  );
  const labelPath: string[] = [];
  keyPath.forEach((key) => {
    function keyInMenu(menu: singeMenu[], key: string) {
      let label = "";
      menu.forEach((item) => {
        if (item.key === key) {
          label = item.label as string;
        }
        if (!label && item.children) {
          let result = keyInMenu(item.children, key);
          if (result) {
            label = result;
          }
        }
      });
      return label;
    }
    keyInMenu(menu, key)
      ? labelPath.unshift(keyInMenu(menu, key))
      : labelPath.unshift(key);
  });
  return labelPath;
};
