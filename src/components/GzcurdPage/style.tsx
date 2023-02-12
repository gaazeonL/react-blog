import changTheme from "@hooks/changTheme";
import styled from "styled-components";
import Table from "antd/lib/table";

const TableHeaderHeight = 30;

export const TableStyle = styled(Table)`
  margin: 20px;
  /* & .ant-table {
    height: ${(props) => {
    const tableHeight = Number(props.scroll?.y);
    return tableHeight + TableHeaderHeight + 87;
  }}px;
  } */
  & .ant-table-body::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    ${changTheme("background-color", true, "whitesmoke", "#292A2D")}
  }
  & .ant-table-body::-webkit-scrollbar-thumb {
    ${changTheme("background-color", false, "#bf5e5a", "#1677ff")}
  }
  & .ant-table-body::-webkit-scrollbar-track {
    ${changTheme("background-color", true, "#ffffff", "#292A2D")}
  }
`;

export const TableHeaderStyle = styled("div")`
  height: ${TableHeaderHeight}px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
`;
