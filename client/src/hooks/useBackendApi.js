import { useEffect } from "react";
import { useSelector } from "react-redux";
import useRefreshToken from "./useRefreshToken";
import backendApi from "../api/backendApi";

const useBackendApi = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const refresh = useRefreshToken(); // refresh and store token to user state

  useEffect(() => {
    const requestInterceptor = backendApi.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"] && currentUser)
          config.headers["Authorization"] = `Bearer ${currentUser.accessToken}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = backendApi.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          return;
        }

        if (error.response?.status === 403) {
          const newToken = await refresh();
          const prevConfig = error.config;
          prevConfig.headers["Authorization"] = `Bearer ${newToken}`;
          // resent prev request
          return backendApi.axiosPrivateClient(prevConfig);
        }
        Promise.reject(error);
      }
    );

    return () => {
      backendApi.interceptors.request.eject(requestInterceptor);
      backendApi.interceptors.response.eject(responseInterceptor);
    };
  }, [currentUser, refresh]);

  return backendApi;
};

export default useBackendApi;
