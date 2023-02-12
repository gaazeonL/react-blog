//react引入
import { useState } from "react";
//redux引入
import { useSelector } from "react-redux";
import { storeType } from "@store/type";
//i18n引入
import { useTranslation } from "react-i18next";
//外部方法引入
import debounce from "@utils/debounce";
//service引入
import { deleteArticleService, getArticlesService } from "@service/article";
import {
  getSelectorPropsType,
  getPaginationPropsType,
  getModalPropsType,
} from "./type";

export const getSelectorProps: getSelectorPropsType = (
  setArticleList,
  setArticleListCount,
  setSelect,
  setLoading
) => {
  const { t } = useTranslation();
  const onChangeDebounce = debounce((event: any) => {
    if (event.target.value) {
      getArticlesService(1, event.target.value).then((result) => {
        if (typeof result.message !== "string" && result.message.aticles) {
          setArticleList(result.message.aticles);
          setArticleListCount(result.message.count);
        }
      });
      setSelect(event.target.value);
    } else {
      getArticlesService(1).then((result) => {
        if (typeof result.message !== "string" && result.message.aticles) {
          setArticleList(result.message.aticles);
          setArticleListCount(result.message.count);
        }
      });
      setSelect("");
    }
  }, 500);
  return {
    size: "large",
    onChange: (event: any) => {
      onChangeDebounce(event);
    },
    onPressEnter: (event: any) => {
      event.target.disabled = true;
      setLoading(true);
      setTimeout(() => {
        event.target.disabled = false;
        setLoading(false);
      }, 500);
    },
    placeholder: t("pages.read.selectBar.placeholder") as string,
    allowClear: true,
  };
};

export const getPaginationProps: getPaginationPropsType = (
  total,
  select,
  setArticleList
) => {
  return {
    showQuickJumper: true,
    total,
    onChange: (pageNumber) => {
      getArticlesService(pageNumber, select).then((result) => {
        if (typeof result.message !== "string" && result.message.aticles) {
          setArticleList(result.message.aticles);
        }
      });
    },
  };
};

export const getModalProps: getModalPropsType = (
  setArticleList,
  setArticleListCount,
  isModalOpen,
  setIsModalOpen,
  deleteUUID,
  setDeleteUUID
) => {
  const { t } = useTranslation();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const token = useSelector<storeType, string>(
    (store) => store.system.globalControl.token
  );
  const onOk = () => {
    deleteArticleService({
      uuid: deleteUUID,
      token,
      setLoading: setConfirmLoading,
    }).then(() => {
      getArticlesService(1).then((result) => {
        if (
          typeof result.message !== "string" &&
          result.message.aticles &&
          result.message.aticles.length > 0
        ) {
          setArticleList(result.message.aticles);
          setArticleListCount(result.message.count);
        }
      });
      setIsModalOpen(false);
    });
  };
  const onCancel = () => {
    setDeleteUUID("");
    setIsModalOpen(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  return {
    title: t("pages.read.deleteModel.title"),
    open: isModalOpen,
    confirmLoading,
    onOk,
    onCancel,
    showModal,
  };
};
