import { put, select, takeLatest } from "redux-saga/effects";
import io from "socket.io-client";
import { socketActions } from "../store/socketSlice";

// Socket connection handler saga
function* socketConnectSaga(action) {
  const SERVER = process.env.REACT_APP_SERVER_DOMAIN;
  let { socket } = yield select((state) => state.socket);

  if (!socket) {
    const { currentUser } = yield select((state) => state.user);
    const socketConnection = io.connect(SERVER, {
      query: {
        currentUser: JSON.stringify(currentUser),
      },
    });

    yield put(socketActions.setSocket(socketConnection));
  }
}

function* socketDisconnectSaga() {
  const socket = yield select((state) => state.socket);

  if (socket && typeof socket.disconnect === "function") {
    socket.disconnect();
    yield put(socketActions.setSocket(null));
  }
}

// Watcher saga
export function* socketSaga() {
  yield takeLatest("socket/socketConnect", socketConnectSaga);
  yield takeLatest("socket/socketDisconnect", socketDisconnectSaga);
}
