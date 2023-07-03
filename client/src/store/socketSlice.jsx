import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null,
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
});

export const socketActions = socketSlice.actions;

export const socketConnect = () => {
  return {
    type: "socket/socketConnect",
  };
};

export const socketDisconnect = () => {
  return {
    type: "socket/socketDisconnect",
  };
};

export default socketSlice;
