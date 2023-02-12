import { ReactElement } from "react";
import { formConfig } from "@components/GzForm/type";
import { ColumnsType } from "antd/lib/table";
import { ArgsProps } from "antd/lib/notification/interface";
import { ExpandableConfig } from "antd/lib/table/interface";
import { TFunction } from "i18next";

export type ModelConfig<serviceType> = {
  /**请求方法 */
  service: (options: any) => Promise<serviceType>;
  /**弹窗打开时给请求方法传入的参数，会合并到请求的body里面。*/
  serviceParms?: {
    [X: string]: any;
  };
  /**所有表单项目样式配置*/
  formStyle?: React.CSSProperties;
  /**表单项目配置*/
  formConfig: formConfig;
  formHeader?: ReactElement;
  formFooter?: ReactElement;
  /**成功时的回调*/
  onServiceFullfilled?: (
    result: any,
    notification: (config: ArgsProps) => void,
    t: TFunction<"translation", undefined, "translation">
  ) => any;
  /**失败时的回调*/
  onServiceRejected?: (
    result: any,
    notification: (config: ArgsProps) => void
  ) => any;
};

export type curdPageTableConfig<
  RecordType = any,
  createServiceResult = any,
  deleteServiceResult = any,
  batchDeletionServiceResult = any,
  editServiceResult = any,
  selectServiceResult = any
> = {
  [x: string]: any;
  name?: string;
  columns: (
    t: TFunction<"translation", undefined, "translation">
  ) => ColumnsType<RecordType>;
  expandable?: ExpandableConfig<RecordType>;
  tableHeadControl?: {
    create?: {
      title?: string;
      onClick?: (...args: any) => any;
    };
    batchDeletion?: {
      title?: string;
      onClick?: (...args: any) => any;
    };
  };
  selectService: (options: any) => Promise<selectServiceResult>;
  getPageCountService: (...args: any) => any;
  createModelConfig?: ModelConfig<createServiceResult>;
  deleteModelConfig?: ModelConfig<deleteServiceResult>;
  batchDeletionModelConfig?: ModelConfig<batchDeletionServiceResult>;
  editModelConfig?: ModelConfig<editServiceResult>;
};

export type selectFormConfig = {
  config: formConfig;
  selectBtn?: {
    title?: string;
  };
};
export type FromFatherProps<
  createServiceResult = any,
  deleteServiceResult = any,
  batchDeletionServiceResult = any,
  editServiceResult = any,
  selectServiceResult = any
> = {
  selectFormConfig: selectFormConfig;
  tableConfig: curdPageTableConfig<
    createServiceResult,
    deleteServiceResult,
    batchDeletionServiceResult,
    editServiceResult,
    selectServiceResult
  >;
};

export type FormModalRef = React.MemoExoticComponent<
  React.ForwardRefExoticComponent<
    FromFatherProps & React.RefAttributes<unknown>
  >
>;
