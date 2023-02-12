import { configureStore } from "@reduxjs/toolkit";
import systemReducer from "./system";
import aboutMeReducer from "./aboutme";
// import chartsReducer from "./charts";
import { storeType } from "./type";
export default configureStore<storeType>({
  reducer: {
    system:systemReducer,
    aboutme: aboutMeReducer,
    // charts: chartsReducer,
  },
});
