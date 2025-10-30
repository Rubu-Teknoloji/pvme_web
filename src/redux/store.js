import { configureStore } from "@reduxjs/toolkit";
 import webInfoReducer from "./webInfoSlice/webInfoSlice";

export const store = configureStore({
  reducer: {
        webInfo: webInfoReducer,

  },
});

export default store;
 