import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error= false;
    },
    persistLogin:(state) => {
      state.loading = false;
      state.error = false;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    subscription: (state, action) => {
      const subscribedUsers = state.currentUser.subscribedUsers;
      if (subscribedUsers?.includes(action.payload)) {
        subscribedUsers.splice(
          subscribedUsers.findIndex(
            (channelId) => channelId === action.payload
          ),
          1
        );
      } else {
        subscribedUsers.push(action.payload);
      }
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
