import { singeMenu, textType } from "@store/system/type";
import jsonDeepCopy from "./jsonDeepCopy";
export default function (menu: singeMenu[], text: textType, language: string) {
  let newMenu = jsonDeepCopy(menu) as singeMenu[];
  function _d(target: singeMenu[]) {
    target.forEach((item) => {
        item.children && _d(item.children);
        item.label = text[language].sider.menu[item.key as string];
    });
  }
  _d(newMenu);
  return newMenu;
}
