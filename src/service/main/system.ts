import { Dispatch } from "redux";
import { Locale } from "antd/lib/locale-provider";
import notification from "antd/lib/notification";
import { singeMenu } from "@store/system/type";
import { changeToken, getAnonymousMenu } from "@store/system";
/**获取菜单
 */
export const getMenuService = async (options: {
  token: string;
  dispatch: Dispatch;
}) => {
  const menuJson: {
    code: number;
    message: singeMenu[];
  } = await (
    await fetch(import.meta.env.VITE_SERVER + "/getmenu", {
      method: "POST",
      headers: {
        Authorization: options.token,
      },
    })
  ).json();
  if (typeof menuJson.message === "string") {
    options.dispatch<any>(getAnonymousMenu());
    options.dispatch<any>(changeToken(""));
    notification.error({
      message: menuJson.message + "，请重新登录",
    });
    throw Error(menuJson.message);
  } else {
    return menuJson.message;
  }
};
/**获取匿名菜单
 */
export const getAnonymousMenuService = async () => {
  const menuJson: {
    code: number;
    message: singeMenu[];
  } = await (
    await fetch(import.meta.env.VITE_SERVER + "/getmenu/anonymous", {
      method: "POST",
    })
  ).json();
  return menuJson.message;
};

/**改变语言
 * @param language 语言字符串
 */
export const changeLanguageService = async (language: string) => {
  const respone = {
    status: "",
    language: "",
    languagePack: null as unknown as Locale,
  };
  switch (language) {
    case "zh_CN":
      try {
        respone.languagePack = (await import("antd/locale/zh_CN")).default;
        respone.language = "zh_CN";
        respone.status = "success";
      } catch {
        respone.status = "fail";
      }
      return respone;
    case "zh_HK":
      try {
        respone.languagePack = (await import("antd/locale/zh_HK")).default;
        respone.language = "zh_HK";
        respone.status = "success";
      } catch {
        respone.status = "fail";
      }
      return respone;
    case "en_US":
      try {
        respone.languagePack = (await import("antd/locale/en_US")).default;
        respone.language = "en_US";
        respone.status = "success";
      } catch {
        respone.status = "fail";
      }
      return respone;
    case "ja_JP":
      try {
        respone.languagePack = (await import("antd/locale/ja_JP")).default;
        respone.language = "ja_JP";
        respone.status = "success";
      } catch {
        respone.status = "fail";
      }
      return respone;
    default:
      try {
        respone.languagePack = (await import("antd/locale/zh_CN")).default;
        respone.language = "zh_CN";
        respone.status = "success";
      } catch {
        respone.status = "fail";
      }
      return respone;
  }
};
