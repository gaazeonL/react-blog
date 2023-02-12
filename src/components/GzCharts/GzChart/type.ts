import { CSSProperties } from "react";
import { ECBasicOption } from "echarts/types/dist/shared";
import type { CardProps } from "antd/lib/card";
export type FromFatherProps = {
  id: string;
  chartOption: ECBasicOption;
  chartStyle?: CSSProperties;
  title?: string;
  async?: boolean;
  description?: string;
  removeBtn?: boolean;
  removeFn?: (id: string) => void;
  removeCallBack?: () => any;
  collapsedBtn?: boolean;
  collapsed?: boolean;
  collapsedFn?: (
    id: string,
    curHeight: {
      current: string | number | undefined;
    }
  ) => void;
  zoomBtn?:boolean;
};
export type getChartPropsType = (
  props: FromFatherProps,
  chartProps: any,
  curHeight: {
    current: string | number | undefined;
  },
  changeShow: () => void
) => CardProps;
