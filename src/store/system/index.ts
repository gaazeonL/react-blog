import { createAsyncThunk, createSlice, Dispatch } from "@reduxjs/toolkit";
import {
  getMenuService,
  getAnonymousMenuService,
  changeLanguageService,
} from "@service/main/system";
import changeMenuLanguage from "@utils/changeMenuLanguage";
import { deleteCache, setCache } from "@utils/cache";
import text from "./text";
import { singeMenu, systemState } from "./type";
const initialState: systemState = {
  globalControl: {
    token: "",
    theme: true,
    isMoveMode: false,
    isShort: false,
    language: null,
    languagePack: null,
    keyPath: [],
  },
  siderBarControl: {
    isCollapse: true,
  },
  menuControl: {
    width: 260,
    height: 500,
    data: [],
  },
  text,
};
export const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    changeToken: (state, action) => {
      state.globalControl.token = action.payload;
      if (state.globalControl.token) {
        setCache("token", action.payload);
      } else {
        deleteCache("token");
      }
    },
    changeTheme: (state, action) => {
      if (action.payload !== null) {
        state.globalControl.theme = action.payload;
        setCache("theme", action.payload);
      } else {
        //获取不到就用store设定的默认设置
        setCache("theme", state.globalControl.theme);
      }
    },
    changeMoveMode: (state, action) => {
      state.globalControl.isMoveMode = action.payload;
    },
    changeIsShort: (state, action) => {
      state.globalControl.isShort = action.payload;
      if (action.payload) {
        state.siderBarControl.isCollapse = true;
      }
    },
    changeKeyPath: (state, action) => {
      state.globalControl.keyPath = action.payload;
    },
    changeCollapse: (state, action) => {
      if (state.globalControl.isShort) {
        state.siderBarControl.isCollapse = true;
      } else {
        state.siderBarControl.isCollapse = action.payload;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getMenu.fulfilled, (state, action) => {
        // state.menuControl.data = action.payload;
        if (state.globalControl.language) {
          state.menuControl.data = changeMenuLanguage(
            action.payload,
            state.text,
            state.globalControl.language
          );
        }
      })
      .addCase(getMenu.rejected, (state, action) => {
        state.globalControl.token = "";
      })
      .addCase(getAnonymousMenu.fulfilled, (state, action) => {
        // state.menuControl.data = action.payload;
        if (state.globalControl.language) {
          state.menuControl.data = changeMenuLanguage(
            action.payload,
            state.text,
            state.globalControl.language
          );
        }
      })
      .addCase(changeLanguage.fulfilled, (state, action) => {
        if (action.payload.status === "success") {
          state.globalControl.languagePack = action.payload.languagePack;
          state.globalControl.language = action.payload.language;
          state.menuControl.data = changeMenuLanguage(
            state.menuControl.data,
            state.text,
            state.globalControl.language
          );
          const html = document.documentElement;
          if (action.payload.language === "zh_CN") {
            html.lang = "zh-Hans";
          } else if (action.payload.language === "zh_HK") {
            html.lang = "zh-Hant";
          } else if (action.payload.language === "en_US") {
            html.lang = "en";
          } else if (action.payload.language === "ja_JP") {
            html.lang = "ja";
          }
          setCache("language", action.payload.language);
        }
      });
  },
});
export const getMenu = createAsyncThunk<
  singeMenu[],
  { token: string; dispatch: Dispatch }
>("system/getMenu", getMenuService);
export const getAnonymousMenu = createAsyncThunk<singeMenu[]>(
  "system/getAnonymousMenu",
  getAnonymousMenuService
);
export const changeLanguage = createAsyncThunk(
  "system/changeLanguage",
  changeLanguageService
);
export const {
  changeToken,
  changeTheme,
  changeMoveMode,
  changeIsShort,
  changeKeyPath,
  changeCollapse,
} = systemSlice.actions;
export default systemSlice.reducer;
