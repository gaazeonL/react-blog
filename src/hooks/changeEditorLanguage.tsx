import { useEffect } from "react";
import { useSelector } from "react-redux";
import { storeType } from "@store/type";
import { i18nChangeLanguage, IDomEditor } from "@wangeditor/editor";
export default function (editor: IDomEditor | null) {
  let language = useSelector<storeType, string | null>((store) => {
    return store.system.globalControl.language;
  });
  if (language === "zh_CN") {
    language = "zh-CN";
  } else if (language === "en_US") {
    language = "en";
  }
  useEffect(() => {
    language ? i18nChangeLanguage(language) : "";
    if (editor) {
      //没有办法，只能通过销毁来刷新editor
      editor.destroy();
    }
  }, [language]);
  language ? i18nChangeLanguage(language) : "";
}
