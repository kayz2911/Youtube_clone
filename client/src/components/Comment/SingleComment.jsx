import React, { useState, useEffect } from "react";
import {
  Container,
  Avatar,
  Details,
  Name,
  Date,
  Text,
} from "./SingleCommentStyled";

import useBackendApi from "../../hooks/useBackendApi";
import moment from "moment";

const SingleComment = (props) => {
  const backendApi = useBackendApi();
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await (await backendApi.findUser(props.comment.userId)).data;
        setChannel(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [backendApi, props.comment.userId]);

  return (
    <Container>
      <Avatar src={channel.img} />
      <Details>
        <Name>
          {channel.name} <Date>{moment(props.comment.createdAt).fromNow()}</Date>
        </Name>
        <Text>{props.comment.desc}</Text>
      </Details>
    </Container>
  );
};

export default SingleComment;
