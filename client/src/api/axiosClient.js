import axios from "axios";

const API_SERVER = process.env.REACT_APP_API_SERVER_DOMAIN;

const axiosClient = axios.create({
    baseURL: API_SERVER,
    timeout: 2500,
});

export const axiosPrivateClient = axios.create({
    baseURL: API_SERVER,
    timeout: 2500,
    withCredentials: true,
});

export default axiosClient;