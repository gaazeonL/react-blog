import Button from "antd/lib/button";
//i18n引入
import { useTranslation } from "react-i18next";
import { memo } from "react";
import {
  CardStyle,
  ContentStyle,
  CoverStyle,
  NoteStyle,
  DescriptionStyle,
  FooterStyle,
  SpaceStyle,
} from "./style";

import { FromFatherProps } from "./type";

const GzArticle = memo((props: FromFatherProps) => {
  const { t } = useTranslation();
  return (
    <CardStyle
      hoverable
      size="small"
      title={props.title ? props.title : ""}
      extra={
        <SpaceStyle>
          {props.editBtn ? (
            <Button type="dashed" onClick={props.onEdit}>
              {t("components.article.extra.edit")}
            </Button>
          ) : (
            <></>
          )}
          {props.deleteBtn ? (
            <Button danger onClick={props.onDelete}>
              {t("components.article.extra.delete")}
            </Button>
          ) : (
            <></>
          )}
        </SpaceStyle>
      }
    >
      <ContentStyle onClick={props.onClick}>
        <CoverStyle cover={props.cover} />
        <NoteStyle>
          <DescriptionStyle>
            <span>{props.description}</span>
          </DescriptionStyle>
          <FooterStyle>
            <span>{props.time}</span>
          </FooterStyle>
        </NoteStyle>
      </ContentStyle>
    </CardStyle>
  );
});

export default GzArticle;
