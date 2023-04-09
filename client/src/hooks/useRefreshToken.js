import backendApi from "../api/backendApi";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const refresh = async (withUserInfo = false) => {
    try {
      const { accessToken } = (await backendApi.refreshToken()).data;
      if (withUserInfo) {
        const { data } = await backendApi.refetchUserDetail(accessToken);
        dispatch(userActions.loginSuccess({ ...data, accessToken }));
      } else {
        if (currentUser) {
          dispatch(
            userActions.loginSuccess({
              ...currentUser,
              accessToken: accessToken,
            })
          );
        }
      }

      return accessToken;
    } catch (error) {
      if(error.response.status === 401) {
        dispatch(userActions.logout());
        return null;
      }
    }
  };

  return refresh;
};

export default useRefreshToken;
