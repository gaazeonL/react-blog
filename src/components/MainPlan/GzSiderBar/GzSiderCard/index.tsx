//react引入
import { useState, useRef, useEffect, memo } from "react";
//antd引入
import Avatar from "antd/lib/avatar";
import Card from "antd/lib/card";
import Divider from "antd/lib/divider";
//i18n引入
import { useTranslation } from "react-i18next";
//组件内部引入
import { FromFatherProps } from "./type";
import StyleCard from "./style";
import GzLoginModal from "@components/GzLoginModal";

/*------------------------------------------------------------------------------
以上为引用层
------------------------------------------------------------------------------*/
export default memo(function GzSiderCard(props: FromFatherProps) {
  const { t } = useTranslation();
  const [ModalOpen, setModalOpen] = useState(() => {
    return () => {};
  });
  const loginModalRef = useRef<any>(null);
  useEffect(() => {
    setModalOpen(() => {
      return loginModalRef.current?.handleOpen;
    });
  }, []);
  return (
    <>
      {/*如果侧边栏闭合上直接不渲染 */}
      <>
        <GzLoginModal ref={loginModalRef} />
        <StyleCard bordered={false}>
          <Card.Meta
            avatar={
              <Avatar
                onClick={ModalOpen}
                size={65}
                src={
                  import.meta.env.VITE_SERVER +
                  "/setting/users/avatar/image/gaazeon.jpg"
                }
              />
            }
            title="Gaazeon"
            description="这个人很懒，什么也没有留下"
          />
        </StyleCard>
        <Divider plain orientation="left">
          <span>{t("sider.divider")}</span>
        </Divider>
      </>
    </>
  );
});
