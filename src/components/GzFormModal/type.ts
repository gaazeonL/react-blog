import { ReactElement } from "react";
import { formConfig } from "@components/GzForm/type";
import { ArgsProps } from "antd/lib/notification/interface";
import { TFunction } from "i18next";
export type FromFatherProps = {
  title?: string;
  formConfig: formConfig;
  formStyle?: React.CSSProperties;
  formHeader?: ReactElement;
  formFooter?: ReactElement;
  service: (...args: any) => Promise<any>;
  onServiceFullfilled?: (
    result: any,
    notification: (config: ArgsProps) => void,
    t: TFunction<"translation", undefined, "translation">
  ) => any;
  onServiceRejected?: (
    result: any,
    notification: (config: ArgsProps) => void,
    t: TFunction<"translation", undefined, "translation">
  ) => any;
};
