import React from "react";
import {
  Container,
  Wrapper,
  AccountInfo,
  Avatar,
  Info,
  Item,
  Hr,
} from "./OptionBoxStyled";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import { userActions } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";

import useBackendApi from "../../hooks/useBackendApi";

const OptionBox = () => {
  const backendApi = useBackendApi();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const logoutHandler = async () => {
    try {
      await backendApi.logoutUser();
      dispatch(userActions.logout());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <AccountInfo>
          <Avatar src={currentUser.img} />
          <Info>
            <p>{currentUser.name}</p>
            <p>{currentUser.email}</p>
          </Info>
        </AccountInfo>
        <Hr />
        <Item>
          <PermIdentityIcon />
          Your Channel
        </Item>
        <Item onClick={logoutHandler}>
          <LogoutOutlinedIcon />
          Sign Out
        </Item>
        <Hr />
        <Item>
          <SettingsOutlinedIcon />
          Setting
        </Item>
        <Hr />
        <Item>
          <HelpOutlinedIcon />
          Help
        </Item>
        <Item>
          <FeedbackOutlinedIcon />
          Send feedback
        </Item>
      </Wrapper>
    </Container>
  );
};

export default OptionBox;
