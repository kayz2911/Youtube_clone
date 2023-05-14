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
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import { userActions } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useUnderDevelopment from "../../hooks/useUnderDevelopment";

import useBackendApi from "../../hooks/useBackendApi";

const OptionBox = (props) => {
  const backendApi = useBackendApi();
  const dispatch = useDispatch();
  const underDevelop = useUnderDevelopment();
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
        <Item onClick={underDevelop}>
          <SettingsOutlinedIcon />
          Setting
        </Item>
        <Hr />
        <Item onClick={underDevelop}>
          <HelpOutlinedIcon />
          Help
        </Item>
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://docs.google.com/forms/d/e/1FAIpQLSffYJqm9zLrBWRcuEuR38YPGSPeo3ohbqRpw-1ENTnKhU2c-A/viewform?entry.347693116=${encodeURIComponent(currentUser.email)}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item onClick={hideOptionBox}>
            <FeedbackOutlinedIcon />
            Send feedback
          </Item>
        </a>
        <Link
          to="report"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item onClick={hideOptionBox}>
            <FlagOutlinedIcon />
            Report
          </Item>
        </Link>
      </Wrapper>
    </Container>
  );
};

export default OptionBox;
