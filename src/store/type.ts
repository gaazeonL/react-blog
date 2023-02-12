import { systemState } from "./system/type";
import { aboutMeState } from "./aboutme/type";
import { chartsState } from "./charts/type";
export type storeType = {
  system: systemState;
  aboutme: aboutMeState;
  // charts:chartsState
};
