import React from "react";
import {
  Container,
  Wrapper,
  NotificationInfo,
  Avatar,
  NotificationText,
} from "./NotificationStyled";

const Notification = ({ notifications }) => {
  return (
    <Container>
      <Wrapper>
        {notifications.length === 0 && "Have not found any notifications"}
        {notifications.length !== 0 &&
          notifications.map((notification, i) => {
            switch (notification.typeNoti) {
              case 0:
                return (
                  <NotificationInfo key={i}>
                    <Avatar src={notification.userRequest.img}/>
                    <NotificationText>
                      {notification.userRequest.name} posted a video
                    </NotificationText>
                  </NotificationInfo>
                );
              case 1:
                return (
                  <NotificationInfo key={i}>
                    <Avatar src={notification.userRequest.img}/>
                    <NotificationText>
                      {notification.userRequest.name} subscribe your channel{" "}
                    </NotificationText>
                  </NotificationInfo>
                );
              default:
                return null;
            }
          })}
      </Wrapper>
    </Container>
  );
};

export default Notification;
