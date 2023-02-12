//react引入
import { memo } from "react";
//redux引入
import { useSelector } from "react-redux";
import { storeType } from "@store/type";
//antd引入
import Button from "antd/lib/button";
import Dropdown from "antd/lib/dropdown";
import Switch from "antd/lib/switch";
import Tooltip from "antd/lib/tooltip";
import Breadcrumb from "antd/lib/breadcrumb";
import { GithubOutlined, TranslationOutlined } from "@ant-design/icons";
//组件内部引入
import { FromFatherProps } from "./types";
import StyleHeader from "./style";
import {
  getStyleHeaderProps,
  getCollapseBtnProps,
  getScrollTopBtnProps,
  getThemeSwitchProps,
  getTranslateProps,
  getTooltipProps,
  getBreadcrumbItem,
} from "./props";
/*------------------------------------------------------------------------------
以上为引用层
------------------------------------------------------------------------------*/
export default memo(function GzHeader(props: FromFatherProps) {
  //合成Header的props
  const styleHeaderProps = getStyleHeaderProps();
  //合成展开收缩按钮props
  const collapseBtnProps = getCollapseBtnProps(props);
  //合成返回顶部按钮props
  const scrollTopBtnProps = getScrollTopBtnProps(props);
  //合成switch组件的props
  const themeSwitch = getThemeSwitchProps(props);
  //合成翻译按钮的props
  const translateProps = getTranslateProps(props);
  //合成头部链接的的props
  const tooltipProps = getTooltipProps();
  //面包屑子类的数据
  const BreadcrumbItem = getBreadcrumbItem();
  const isShort = useSelector<storeType, boolean>(
    (state) => state.system.globalControl.isShort
  );
  return (
    <StyleHeader {...styleHeaderProps}>
      <div className="flex-item">
        <div className="left-item">
          {/*根据是否为矮高度切换左上角按钮*/}
          {isShort ? (
            <Button {...scrollTopBtnProps}></Button>
          ) : (
            <Button {...collapseBtnProps} />
          )}
        </div>
        <div className="middle-item">
          {/*面包屑位置*/}
          <Breadcrumb>
            {BreadcrumbItem.map((item) => {
              return <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>;
            })}
          </Breadcrumb>
        </div>
        <div className="right-item">
          {/*转到github按钮*/}
          <Tooltip {...tooltipProps}>
            <Button type="link">
              <GithubOutlined />
              GitHub
            </Button>
          </Tooltip>
          {/*切换语言按钮*/}
          <Dropdown {...translateProps}>
            <Button type="text">
              <TranslationOutlined />
            </Button>
          </Dropdown>
          {/*切换主题按钮*/}
          <Switch {...themeSwitch} />
        </div>
      </div>
    </StyleHeader>
  );
});
