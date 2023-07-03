import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Wrapper } from "./OnlineNotificationStyled";

const OnlineNotification = (props) => {
  const { socket } = useSelector((state) => state.socket);
  const [notification, setNotification] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [shouldHideNotification, setShouldHideNotification] = useState(false);

  useEffect(() => {
    const handleNotification = (data) => {
      let message;
      switch (data.type) {
        case 0:
          message = `${data.userSendNotification.name} posted a video`;
          setNotification(message);
          break;
        case 1:
          message = `${data.userSendNotification.name} subscribed to your channel`;
          setNotification(message);
          break;
        default:
          break;
      }
      setShowNotification(true);
    };

    if (socket) {
      socket.on("getNotification", handleNotification);
    }

    return () => {
      if (socket) {
        socket.off("getNotification", handleNotification);
      }
    };
  }, [socket]);

  useEffect(() => {
    if (notification) {
      const timeoutId = setTimeout(() => {
        setShouldHideNotification(true);
      }, 3500);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [notification]);

  useEffect(() => {
    if (shouldHideNotification) {
      const timeoutId = setTimeout(() => {
        setNotification(null);
        setShowNotification(false);
        setShouldHideNotification(false);
      }, 300);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [shouldHideNotification]);

  if (!notification) return null;

  return (
    <Container showNotification={showNotification && !shouldHideNotification}>
      <Wrapper>{notification}</Wrapper>
    </Container>
  );
};

export default OnlineNotification;