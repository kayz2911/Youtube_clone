import backendApi from "../api/backendApi";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const refresh = async (withUserInfo = false) => {
    const { accessToken } = (await backendApi.refreshToken()).data;
    if (withUserInfo) {
      const { data } = await backendApi.refetchUserDetail(accessToken);
      dispatch(userActions.loginSuccess({ ...data, accessToken }));
    } else {
      if (currentUser) currentUser.accessToken = accessToken;
      dispatch(userActions.loginSuccess(currentUser));
    }

    return accessToken;
  };

  return refresh;
};

export default useRefreshToken;
