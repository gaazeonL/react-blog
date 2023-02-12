//react引入
import { memo } from "react";
//redux引入
import { useSelector } from "react-redux";
import { storeType } from "@store/type";

import { BrowserRouter } from "react-router-dom";
//antd引入
import ConfigProvider from "antd/lib/config-provider";
import { Locale } from "antd/lib/locale-provider";
import Spin from "antd/lib/spin";
//主面板引入
import MainPlan from "@components/MainPlan";
//引入全局文件，并且初始化项目
import "./global";
//引入全局hooks
import initHooks from "@hooks/initHooks";
//主题引入
import darkTheme from "./global/darkTheme";

import { singeMenu } from "@store/system/type";
function App() {
  //运行initHooks，初始化项目
  initHooks();
  const menu = useSelector<storeType, singeMenu[]>(
    (store) => store.system.menuControl.data
  );
  const languagePack = useSelector<storeType, Locale | null>(
    (store) => store.system.globalControl.languagePack
  );
  const theme = useSelector<storeType, boolean>(
    (store) => store.system.globalControl.theme
  );
  return (
    <>
      {/* languagePack为空的话直接不渲染，菜单为空也不渲染，直至获取到为止 */}
      {languagePack && menu.length !== 0 ? (
        <ConfigProvider
          locale={languagePack}
          theme={{
            token: theme ? {} : darkTheme,
          }}
        >
          <BrowserRouter>
            <div className="App">
              <MainPlan />
            </div>
          </BrowserRouter>
        </ConfigProvider>
      ) : (
        <>{/*todo:loadingPage*/}</>
      )}
    </>
  );
}
export default memo(App);
