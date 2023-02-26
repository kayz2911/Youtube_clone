import { useSelector } from "react-redux";
import useRefreshToken from "../../hooks/useRefreshToken";
import { Outlet } from "react-router-dom";
import { useEffect, useRef } from "react";
import Loading from "../HandleError/Loading";

const PersistLogin = () => {
  const isFirstTime = useRef(true);
  const currentUser = useSelector((state) => state.user);
  const refresh = useRefreshToken();

  useEffect(() => {
    const reLogin = async () => {
      console.log("ReLogin");
      try {
        await refresh(true);
      } catch (error) {
        console.log(error);
      }
    };
    if (!currentUser.currentUser?.accessToken && isFirstTime.current) reLogin();

    return () => {
      isFirstTime.current = false;
    };
  }, [currentUser, refresh]);

  return currentUser.loading ? <Loading /> : <Outlet />;
};

export default PersistLogin;
