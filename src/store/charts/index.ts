import { createSlice } from "@reduxjs/toolkit";
import { chartsState } from "./type";
const initialState: chartsState = {
  charts: {},
};
const chartsSlice = createSlice({
  name: "charts",
  initialState,
  reducers: {
    addCharts(state, action) {
      state.charts[action.payload] = true;
    },
  },
});
export const { addCharts } = chartsSlice.actions;
export default chartsSlice.reducer;
