import { CSSProperties } from "react";
import { FromFatherProps as GzChartType } from "./GzChart/type";
export type { FromFatherProps as GzChartType } from "./GzChart/type";
export type FromFatherProps = {
  style?: CSSProperties;
  data: GzChartType[];
};
