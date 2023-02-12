//react引入
import { useEffect } from "react";
//redux引入
import { useDispatch, useSelector } from "react-redux";
import * as system from "@store/system";
import { storeType } from "@store/type";
//i18n引入
import { useTranslation } from "react-i18next";
//通用方法引入
import debounce from "@utils/debounce";
import { getCache } from "@utils/cache";
export default function () {
  const { t, i18n } = useTranslation();
  const token = useSelector<storeType, string>(
    (store) => store.system.globalControl.token
  );
  const dispatch = useDispatch();
  //确定设定的菜单高度，用于判断系统是否进入矮高度模式
  const menuHeight = useSelector<storeType, number>(
    (state) => state.system.menuControl.height
  );
  useEffect(() => {
    //从缓存中获取数据
    dispatch<any>(system.changeToken(getCache("token").value));
    dispatch(system.changeTheme(getCache("theme").value));
    dispatch<any>(system.changeLanguage(getCache("language").value));
    if (getCache("language").value) {
      i18n.changeLanguage(getCache("language").value);
    }
    
    //从外部网络中获取菜单
    setTimeout(() => {
      //保证菜单正常获取，因为要先又language的数据才能有menu的数据
      const localToken = getCache("token").value as string;
      if (localToken) {
        dispatch<any>(system.getMenu({ token: localToken, dispatch }));
      } else {
        dispatch<any>(system.getAnonymousMenu());
      }
    }, 500);

    //判断项目第一次进入时是否为移动模式
    dispatch(system.changeMoveMode(!(window.screen.width > 726)));
    /**
     *isShort判断页面高度是否低于设定的菜单高度
     */
    function isShort() {
      dispatch(system.changeIsShort(menuHeight > window.innerHeight));
    }
    isShort();
    window.onresize = debounce(isShort, 200);
  }, [token]);
}
