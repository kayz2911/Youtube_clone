import axiosClient, { axiosPrivateClient } from "./axiosClient";
import parseJwt from "./helper";

const endpoint = {
  register: "/auth/register",
  login: "/auth/login",
  logout: "/auth/logout",
  forgotPassWord: "/auth/forgot_password",
  resetPassword: "/auth/reset_password",
  refreshToken: "/auth/refresh_token",
};

export const videoListTypes = {
  random: "random",
  trending: "trending",
  subscription: "subscription",
};

const backendApi = {
  //User
  registerUser(params) {
    return axiosPrivateClient.post(endpoint.register, params);
  },

  loginUser: (email, password) => {
    return axiosPrivateClient.post(endpoint.login, { email, password });
  },

  forgotPassWord: (email) => {
    return axiosPrivateClient.post(endpoint.forgotPassWord, { email });
  },

  resetPassword: (token, newPassword) => {
    return axiosPrivateClient.post(endpoint.resetPassword + token, {
      newPassword,
    });
  },

  logoutUser: () => {
    return axiosPrivateClient.post(endpoint.logout);
  },

  refreshToken: () => {
    return axiosPrivateClient.get(endpoint.refreshToken);
  },

  findUser: (userId) => {
    const path = `/users/find/${userId}`;
    const user = axiosPrivateClient.get(path);
    return user;
  },

  refetchUserDetail: (accessToken) => {
    const payload = parseJwt(accessToken);
    const path = "/users/" + payload.id;
    return axiosClient.get(path, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  likeVideo: async (videoId) => {
    const path = `/users/like/${videoId}`;
    const video = await axiosClient.put(path);
    return video;
  },

  dislikeVideo: async (videoId) => {
    const path = `/users/dislike/${videoId}`;
    const video = await axiosClient.put(path);
    return video;
  },

  subscribeUser: async (userId) => {
    const path = `/users/subscribe/${userId}`;
    const user = await axiosClient.put(path);
    return user;
  },

  unsubscribeUser: async (userId) => {
    const path = `/users/unsubscribe/${userId}`;
    const user = await axiosClient.put(path);
    return user;
  },

  //Video
  getListVideos: async (type, page) => {
    const path = `/videos/${type}?page=${page}`;
    const videos = await axiosClient.get(path);
    return videos;
  },

  findSingleVideo: async (videoId) => {
    const path = `/videos/${videoId}`;
    const video = await axiosClient.get(path);
    return video;
  },

  getSimilarVideos: async (tags, page) => {
    const path = `/videos/tags?tags=${tags}&page=${page}`;
    const videos = await axiosClient.get(path);
    return videos;
  },

  searchVideos: async (q, page) => {
    const path = `/videos/search${q}&page=${page}`;
    const videos = await axiosClient.get(path);
    return videos;
  },

  addVideo: async (params) => {
    const path = `/videos/createVideo`;
    const video = await axiosClient.post(path, params);
    return video;
  },

  //Comment
  getAllComments: async (videoId) => {
    const path = `/comments/${videoId}`;
    const comments = await axiosClient.get(path);
    return comments;
  },

  addComment: async (videoId, desc) => {
    const path = `comments/addComment/${videoId}`;
    const comment = await axiosClient.post(path, {desc});
    return comment;
  },

  deleteComment: async (commentId) => {
    const path = `comments/${commentId}`;
    return await axiosClient.delete(path);
  },

  interceptors: axiosClient.interceptors,

  axiosPrivateClient: axiosPrivateClient,
};

export default backendApi;
