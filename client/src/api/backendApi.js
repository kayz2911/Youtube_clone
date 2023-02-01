import axiosClient, { axiosPrivateClient } from "./axiosClient";
import parseJwt from "./helper";

const endpoint = {
  register: "/auth/register",
  login: "/auth/login",
  logout: "/auth/logout",
  refreshToken: "/auth/refresh_token",
};

export const videoListTypes = {
  random: "random",
  trending: "trending",
  subscription: "subscription",
};

const backendApi = {
  //User
  registerUser(username, email, password) {
    return axiosPrivateClient.post(endpoint.register, {
      username: username,
      email: email,
      password: password,
    });
  },

  loginUser: (email, password) => {
    return axiosPrivateClient.post(endpoint.login, { email, password });
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

  getSimilarVideos: async (tags) => {
    const path = `/videos/tags?tags=${tags}`;
    const videos = await axiosClient.get(path);
    return videos;
  },

  searchVideos: async (q) => {
    const path = `/videos/search${q}`;
    const videos = await axiosClient.get(path);
    return videos;
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

  interceptors: axiosClient.interceptors,

  axiosPrivateClient: axiosPrivateClient,
};

export default backendApi;
