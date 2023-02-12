//react引入
import { memo, useState, useEffect } from "react";
//redux引入
import { useSelector } from "react-redux";
import { storeType } from "@store/type";
// import { changeKeyPath } from "@store/system";
//react-router引入
import { useNavigate } from "react-router-dom";
//i18n引入
import { useTranslation } from "react-i18next";
//antd引入
import Divider from "antd/lib/divider";
import Title from "antd/lib/typography/Title";
import Input from "antd/lib/input";
import Pagination from "antd/lib/pagination";
import Modal from "antd/lib/modal";
import { LoadingOutlined } from "@ant-design/icons";
//dayjs引入
import dayjs from "dayjs";
//hooks引入
import changekeyPath from "@hooks/changekeyPath";
import useVerifyItem from "@hooks/useVerifyItem";
//服务方法引入
import { getArticlesService } from "@service/article";
//外部组件引入
import GzArticle from "@components/GzArticle";
//内部组件引入
import { getSelectorProps, getPaginationProps, getModalProps } from "./props";
import { PaginationDiv, SelectorDiv, LoadingIconDiv } from "./style";
/*------------------------------------------------------------------------------
以上为引用层
------------------------------------------------------------------------------*/
const Read = memo(() => {
  changekeyPath();
  const { t } = useTranslation();
  const editArticleVerify = useVerifyItem("article::editArticle");
  const deleteArticleVerify = useVerifyItem("article::deleteArticle");
  const theme = useSelector<storeType>(
    (store) => store.system.globalControl.theme
  );
  const navigate = useNavigate();
  const [articleList, setArticleList] = useState<any[]>([]);
  const [articleListCount, setArticleListCount] = useState(0);
  const [select, setSelect] = useState("");
  const [Loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteUUID, setDeleteUUID] = useState("");
  const selectorProps = getSelectorProps(
    setArticleList,
    setArticleListCount,
    setSelect,
    setLoading
  );
  const paginationProps = getPaginationProps(
    articleListCount,
    select,
    setArticleList
  );
  const modalProps = getModalProps(
    setArticleList,
    setArticleListCount,
    isModalOpen,
    setIsModalOpen,
    deleteUUID,
    setDeleteUUID
  );

  useEffect(() => {
    getArticlesService(1).then((result) => {
      if (typeof result.message !== "string" && result.message.aticles) {
        setArticleList(result.message.aticles);
        setArticleListCount(result.message.count);
      }
    });
  }, []);
  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Modal {...modalProps}>
        <p>{t("pages.read.deleteModel.message")}</p>
      </Modal>

      <Divider orientation="left">
        <Title>{t("pages.read.title")}</Title>
      </Divider>
      <SelectorDiv>
        <Input {...selectorProps} />
        {Loading ? (
          <LoadingIconDiv>
            <LoadingOutlined style={{ color: theme ? "black" : "white" }} />
          </LoadingIconDiv>
        ) : (
          <></>
        )}
      </SelectorDiv>

      {articleList.map((article) => {
        return (
          <GzArticle
            key={article.uuid}
            title={article.title}
            description={article.description}
            cover={article.cover}
            time={dayjs(article.createdAt).format("YYYY-MM-DD")}
            deleteBtn={deleteArticleVerify}
            editBtn={editArticleVerify}
            onClick={() => {
              navigate("/read/" + article.uuid);
            }}
            onEdit={() => {
              navigate("/write", {
                state: {
                  uuid: article.uuid,
                  operate: "edit",
                },
              });
            }}
            onDelete={() => {
              setDeleteUUID(article.uuid);
              showModal();
            }}
          ></GzArticle>
        );
      })}

      <PaginationDiv>
        {articleList.length === 0 ? (
          <Title level={5}>{t("pages.read.selectBar.noSelect")}</Title>
        ) : (
          <Pagination {...paginationProps} />
        )}
      </PaginationDiv>
    </>
  );
});

export default Read;
