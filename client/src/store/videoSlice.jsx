import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentVideo: null,
  loading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    like: (state, action) => {
      const currentVideo = state.currentVideo;
      if (!currentVideo.likes.includes(action.payload)) {
        currentVideo.likes.push(action.payload);
        currentVideo.dislikes.splice(
          currentVideo.dislikes.findIndex(
            (userId) => userId === action.payload
          ), 1
        );
      }
    },
    dislike: (state, action) => {
      const currentVideo = state.currentVideo;
      if (!currentVideo.dislikes.includes(action.payload)) {
        currentVideo.dislikes.push(action.payload);
        currentVideo.likes.splice(
          currentVideo.likes.findIndex(
            (userId) => userId === action.payload
          ), 1
        );
      }
    },
  },
});

export const videoActions = videoSlice.actions;

export default videoSlice;
