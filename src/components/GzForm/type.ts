import { FormInstance, RuleRender } from "antd/lib/form";
import { ColProps } from "antd/lib/grid/col";
import { CSSProperties, ReactElement } from "react";
type selectValues = { value: any; title?: string; children?: selectValues }[];

export type formConfig = {
  initialValues?: {
    [X: string]: any;
  };
  /**统一设置表单项目大小*/
  size?: "small" | "middle" | "large";
  /**表单是否有提示*/
  autoComplete?: string;
  /**配置表单布局模式*/
  layout?: "horizontal" | "inline" | "vertical";
  /**配置表单布局*/
  formItemLayout?: {
    labelCol?: ColProps;
    wrapperCol?: ColProps;
  };
  /**配置表单样式*/
  formItemStyle?: CSSProperties;
  /**配置表单项目*/
  items: {
    type:
      | "Input"
      | "Password"
      | "TextArea"
      | "Checkbox"
      | "Radio"
      | "Select"
      | "TreeSelect"
      | "DatePicker";
    key: string;
    label?: string;
    size?: "small" | "middle" | "large";
    style?: CSSProperties;
    inputOption?: {
      prefix?: React.ReactNode;
      inputBefore?: React.ReactNode;
      inputAfter?: React.ReactNode;
    };
    selectOption?: {
      mode?: "multiple" | "tags";
      treeLine?: boolean;
      asyncValue?: (token: string) => Promise<{ label: any; value: any }[]>;
      values?: selectValues;
    };
    checkBoxValues?: { value: any; title?: string }[] | string | boolean;
    radioValues?: { value: any; title?: string }[];
    placeholder?: string;
    rules?: (
      | {
          required?: boolean;
          message?: string;
          regular?: RegExp;
        }
      | RuleRender
    )[];
  }[];
};

export type FromFatherProps = {
  style?: CSSProperties;
  form?: FormInstance<any>;
  children?: ReactElement<any, any>[];
  config: formConfig;
};
