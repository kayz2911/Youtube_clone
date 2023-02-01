import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import videoSlice from "./videoSlice";

const store = configureStore({
  reducer: { user: userSlice.reducer, video: videoSlice.reducer },
});

export default store;
