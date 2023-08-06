import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Wrapper,
  Search,
  Input,
  Button,
  User,
  Avatar,
  NotificationCount,
  NotificationContainer,
} from "./NavbarStyled";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import OptionBox from "./OptionBox/OptionBox";
import Notification from "./Notification/Notification";
import { useSelector } from "react-redux";
import UploadModal from "../Modal/UploadVideo/UploadModal";
import useBackendApi from "../../hooks/useBackendApi";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [showOptionBox, setShowOptionBox] = useState(false);
  const [showUploadVideoModal, setShowUploadVideoModal] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const backendApi = useBackendApi();

  const hoverIconHandler = (e) => {
    e.target.style.cursor = "pointer";
  };

  const goToSearch = useCallback(() => {
    if (query.trim().length > 0) {
      navigate({
        pathname: `/search`,
        search: `?q=${query}`,
      });
    }
  }, [query, navigate]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [query, goToSearch]);

  useEffect(() => {
    const getAllNotifications = async () => {
      try {
        const notifications = await (
          await backendApi.getAllNotifications()
        ).data;
        setNotifications(notifications);
      } catch (error) {
        console.log(error);
      }
    };

    let intervalId;

    if (currentUser) {
      getAllNotifications();

      intervalId = setInterval(() => {
        getAllNotifications();
      }, 10000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [backendApi, currentUser]);

  const handleClickShowNotifications = async () => {
    setShowNotification(!showNotification);
    if (showNotification) {
      try {
        await backendApi.seenAllNotifications();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input
              placeholder="Search"
              onChange={(e) => setQuery(e.target.value)}
            />
            <SearchOutlinedIcon
              onClick={goToSearch}
              onMouseOver={hoverIconHandler}
            />
          </Search>
          {currentUser ? (
            <User>
              <VideoCallOutlinedIcon
                onClick={() => setShowUploadVideoModal(true)}
                onMouseOver={hoverIconHandler}
              />
              <NotificationContainer>
                <NotificationsOutlinedIcon
                  onClick={handleClickShowNotifications}
                  onMouseOver={hoverIconHandler}
                />
                {notifications.filter((noti) => !noti.seen).length > 0 && (
                  <NotificationCount>
                    {notifications.filter((noti) => !noti.seen).length}
                  </NotificationCount>
                )}
                {showNotification ? (
                  <Notification notifications={notifications} />
                ) : null}
              </NotificationContainer>
              {showOptionBox ? (
                <OptionBox
                  hideOptionBox={() => {
                    setShowOptionBox(false);
                  }}
                />
              ) : null}
              <Avatar
                src={currentUser.img}
                onClick={() => {
                  setShowOptionBox(!showOptionBox);
                }}
                onMouseOver={hoverIconHandler}
              />
              {currentUser.name}
            </User>
          ) : (
            <Link to="login" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon /> SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {showUploadVideoModal ? (
        <UploadModal setShowUploadVideoModal={setShowUploadVideoModal} />
      ) : null}
    </>
  );
};

export default Navbar;
