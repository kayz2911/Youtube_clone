import { all, spawn } from "redux-saga/effects";
import { socketSaga } from "./socketSaga";

function* rootSaga() {
  yield all([spawn(socketSaga)]);
}

export default rootSaga;
