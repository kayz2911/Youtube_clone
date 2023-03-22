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
import { Link } from "react-router-dom";

import useBackendApi from "../../hooks/useBackendApi";

const OptionBox = (props) => {
  const backendApi = useBackendApi();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const logoutHandler = async () => {
    props.hideOptionBox();
    try {
      await backendApi.logoutUser();
      dispatch(userActions.logout());
    } catch (error) {
      console.log(error);
    }
  };

  const hideOptionBox = () => {
    props.hideOptionBox();
  };

  return (
    <Container>
      <Wrapper>
        <AccountInfo onClick={hideOptionBox}>
          <Avatar src={currentUser.img} />
          <Info>
            <p>{currentUser.name}</p>
            <p>{currentUser.email}</p>
          </Info>
        </AccountInfo>
        <Hr />
        <Link to="myVideo" style={{ textDecoration: "none", color: "inherit" }}>
          <Item onClick={hideOptionBox}>
            <PermIdentityIcon />
            Your Channel
          </Item>
        </Link>
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
