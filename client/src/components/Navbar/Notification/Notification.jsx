import React from "react";
import {
  Container,
  Wrapper,
  NotificationInfo,
  Avatar,
  NotificationText,
} from "./NotificationStyled";

const getNotificationText = (notification) => {
  const { userRequest } = notification;
  switch (notification.typeNoti) {
    case 0:
      return `${userRequest.name} posted a video`;
    case 1:
      return `${userRequest.name} subscribed to your channel`;
    default:
      return null;
  }
};

const Notification = ({ notifications }) => {
  return (
    <Container>
      <Wrapper>
        {notifications.length === 0 && "Have not found any notifications"}
        {notifications.length !== 0 &&
          notifications.map((notification, i) => (
            <NotificationInfo key={i}>
              <Avatar src={notification.userRequest.img} />
              <NotificationText>{getNotificationText(notification)}</NotificationText>
            </NotificationInfo>
          ))}
      </Wrapper>
    </Container>
  );
};

export default Notification;
