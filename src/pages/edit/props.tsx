//redux引入
import { useSelector } from "react-redux";
import { storeType } from "@store/type";
//react-router引入
import { useLocation } from "react-router-dom";
//i18n引入
import { useTranslation } from "react-i18next";
import notification from "antd/lib/notification";
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";
import { getToolbarPropsType, getEditorPropsType } from "./type";

export const getToolbarProps: getToolbarPropsType = (editor) => {
  // 工具栏配置
  const defaultConfig: Partial<IToolbarConfig> = {};
  return {
    className: "toolbar",
    editor,
    defaultConfig,
    mode: "default",
  };
};
export const getEditorProps: getEditorPropsType = (
  editor,
  setEditor,
  html,
  setHtml,
  uuid
) => {
  const { t } = useTranslation();
  const token = useSelector<storeType, string>(
    (store) => store.system.globalControl.token
  );
  const location = useLocation();
  let locationUUID;
  if (location.state && location.state.uuid) {
    locationUUID = location.state.uuid;
  }
  const defaultConfig: Partial<IEditorConfig> = {
    // TS 语法
    placeholder: t("pages.edit.editor.placeholder") as string,
    MENU_CONF: {
      uploadImage: {
        server:
          import.meta.env.VITE_SERVER +
          "/article/" +
          (locationUUID ? locationUUID : uuid) +
          "/upload",
        fieldName: "file",
        headers: {
          Authorization: token,
        },
        maxFileSize: 10 * 1024 * 1024, // 1M
        onError(file: File, err: any, res: any) {
          notification.error({
            message: t("pages.edit.editor.MENU_CONF.onError.message"),
            description: err.message,
          });
        },
      },
    },
  };
  const onCreated = (editor: IDomEditor) => {
    setEditor(editor);
  };
  const onChange = (editor: IDomEditor) => setHtml(editor.getHtml());
  return {
    className: "editor",
    defaultConfig,
    value: html,
    onCreated,
    onChange,
    mode: "default",
    style: { height: "70vh" },
  };
};
