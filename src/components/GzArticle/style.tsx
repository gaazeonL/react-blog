import styled from "styled-components";
import Card from "antd/lib/card";
import noImgPng from "@assets/img/no-image.png";
import { CoverStyleProps } from "./type";

export const CardStyle = styled(Card)`
  width: 80%;
  margin: 20px auto;
`;
export const ContentStyle = styled("div")`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
export const CoverStyle = styled("div")<CoverStyleProps>`
  width: 150px;
  height: 150px;
  background-image: ${(props) => {
    if (props.cover) {
      return `url(${props.cover})`;
    } else {
      return `url(${noImgPng})`;
    }
  }};
  background-position: center;
  background-size: cover;
`;
export const NoteStyle = styled("div")`
  flex: 1;
  min-width: 240px;
  margin: 20px 20px 0 20px;
`;
export const DescriptionStyle = styled("div")`
  max-height: 75px;
  margin-bottom: 25px;
  color: #777;
  line-height: 25px;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;
export const FooterStyle = styled("div")`
  height: 30px;
  position: absolute;
  bottom: 0;
  right: 20px;
  display: flex;
  flex-direction: row-reverse;
`;

export const SpaceStyle = styled("div")`
  & .ant-btn {
    margin: 0 5px;
  }
`;
