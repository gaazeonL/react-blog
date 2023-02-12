//react引入
import { memo, useEffect, useState } from "react";
//redux引入
import { useSelector } from "react-redux";
import { storeType } from "@store/type";
//react-router引入
import { useNavigate, useLocation } from "react-router-dom";
import { v4 } from "uuid";
//antd引入
import Divider from "antd/lib/divider";
import Title from "antd/lib/typography/Title";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
//i18n引入
import { useTranslation } from "react-i18next";
//wangeditor引入
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { IDomEditor } from "@wangeditor/editor";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
//发布请求引入
import {
  createArticleService,
  editArticleService,
  getArticleService,
} from "@service/article";
//全局方法引入
import { editorAddLanguage } from "@global/wangEditor";
//hooks引入
import changeEditorLanguage from "@hooks/changeEditorLanguage";
import changekeyPath from "@hooks/changekeyPath";
//组件内部引入
import { getEditorProps, getToolbarProps } from "./props";
import { TitleDiv, EditDiv, ButtonBar } from "./style";

const Edit = memo(() => {
  changekeyPath();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const token = useSelector<storeType, string>(
    (store) => store.system.globalControl.token
  );
  const [uuid, setuuid] = useState<string>(v4());
  // const [searchParams, setSearchParams] = useSearchParams();
  const [title, setTitle] = useState<string>("");
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  const [html, setHtml] = useState("");
  editorAddLanguage();
  changeEditorLanguage(editor);
  const toolbarProps = getToolbarProps(editor);
  const editorProps = getEditorProps(editor, setEditor, html, setHtml, uuid);

  const [submitLoading, setSubmitLoading] = useState(false);
  const submit = function () {
    if (
      location.state &&
      location.state.uuid &&
      location.state.operate === "create"
    ) {
      createArticleService({
        uuid: location.state.uuid,
        title,
        text: editor!.getText(),
        content: html,
        token,
        setLoading: setSubmitLoading,
      }).then((result) => {
        if (result.code === 0) {
          setTitle("");
          setHtml("");
          location.state = {
            uuid: v4(),
            operate: "create",
          };
        }
      });
    } else if (
      location.state &&
      location.state.uuid &&
      location.state.operate === "edit"
    ) {
      editArticleService({
        uuid: location.state.uuid,
        title,
        text: editor!.getText(),
        content: html,
        token,
        setLoading: setSubmitLoading,
      }).then((result) => {
        if (result.code === 0) {
          setTitle("");
          setHtml("");
          navigate("/read");
        }
      });
    }
  };
  const reset = () => {
    setTitle("");
    setHtml("");
  };
  //根据如果location.state有参数就用参数里面的数据，如果没有就初始化。
  useEffect(() => {
    if (!location.state) {
      location.state = {
        uuid,
        operate: "create",
      };
    }
    if (
      location.state &&
      location.state.uuid &&
      location.state.operate === "edit"
    ) {
      getArticleService(location.state.uuid).then((result) => {
        if (typeof result.message !== "string" && result.message.aticle) {
          const { title, content } = result.message.aticle;
          setTitle(title);
          setHtml(content);
        }
      });
    }
  }, []);
  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);
  return (
    <>
      <Divider orientation="left">
        <Title>{t("pages.edit.title")}</Title>
      </Divider>
      <TitleDiv>
        <Input
          placeholder={t("pages.edit.titleBar.placeholder") as string}
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
      </TitleDiv>
      <EditDiv>
        <Toolbar {...toolbarProps} />
        <Editor {...editorProps} />
        <ButtonBar>
          <Button loading={submitLoading} type="primary" onClick={submit}>
            {t("pages.edit.submitBtn")}
          </Button>
          <Button type="primary" onClick={reset}>
            {t("pages.edit.resetBtn")}
          </Button>
        </ButtonBar>
      </EditDiv>
    </>
  );
});
export default Edit;
