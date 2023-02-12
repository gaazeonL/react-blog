import { InputProps } from "antd/lib/input";
import { PaginationProps } from "antd/lib/pagination";
import { ModalProps } from "antd/lib/modal";
export type getSelectorPropsType = (
  setArticleList: React.Dispatch<React.SetStateAction<any[]>>,
  setArticleListCount: React.Dispatch<React.SetStateAction<number>>,
  setSelect: React.Dispatch<React.SetStateAction<string>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => InputProps;

export type getPaginationPropsType = (
  total: number,
  select: string,
  setArticleList: React.Dispatch<React.SetStateAction<any[]>>
) => PaginationProps;

export type getModalPropsType = (
  setArticleList: React.Dispatch<React.SetStateAction<any[]>>,
  setArticleListCount: React.Dispatch<React.SetStateAction<number>>,
  isModalOpen: boolean,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  deleteUUID: string,
  setDeleteUUID: React.Dispatch<React.SetStateAction<string>>
) => ModalProps;
