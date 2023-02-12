//react引入
import { memo, useEffect, useRef, useState } from "react";
//react-router引入
import { useParams } from "react-router";
//antd引入
import Tooltip from "antd/lib/tooltip";
import Title from "antd/lib/typography/Title";
import Divider from "antd/lib/divider";
//service引入
import { getArticleService } from "@service/article";
//hooks引入
import changekeyPath from "@hooks/changekeyPath";
//组件内部引入
import { TitleDiv, ContentDiv } from "./style";
const article = memo(() => {
  changekeyPath();
  const [title, setTitle] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  useEffect(() => {
    const uuid = params.uuid as string;
    getArticleService(uuid).then((result) => {
      if (typeof result.message !== "string" && result.message.aticle) {
        setTitle(result.message.aticle.title);
        if (contentRef.current) {
          contentRef.current.innerHTML = result.message.aticle.content;
        }
      }
    });
  }, []);
  return (
    <div>
      <TitleDiv>
        <Tooltip title={title}>
          <Divider orientation="left">
            <Title>{title}</Title>
          </Divider>
        </Tooltip>
      </TitleDiv>
      <ContentDiv ref={contentRef}></ContentDiv>
    </div>
  );
});

export default article;
