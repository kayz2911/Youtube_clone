import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import videoSlice from "./videoSlice";
import socketSlice from "./socketSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/saga";

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    video: videoSlice.reducer,
    socket: socketSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

// Run the socket saga
sagaMiddleware.run(rootSaga);

export default store;
