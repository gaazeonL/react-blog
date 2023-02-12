import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAboutMeService } from "@service/aboutMe";
import { aboutMeState } from "./type";
const initialState: aboutMeState = {
  data: {
    technologyStack: {
      name: "",
    },
  },
};
export const getAboutMedata = createAsyncThunk(
  "aboutme/getAboutMedata",
  getAboutMeService
);
const aboutMeSlice = createSlice({
  name: "aboutme",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAboutMedata.fulfilled, (state, action) => {
      state.data.technologyStack = action.payload.message;
    });
  },
});
export default aboutMeSlice.reducer;
