import React, { useState, useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import {
  Wrapper,
  Container,
  Avatar,
  Details,
  Name,
  Date,
  Text,
  Button,
} from "./SingleCommentStyled";

import useBackendApi from "../../hooks/useBackendApi";
import moment from "moment";

const SingleComment = (props) => {
  const backendApi = useBackendApi();
  const { currentUser } = useSelector((state) => state.user);
  const [channel, setChannel] = useState({});
  const [showMore, setShowMore] = useState(false);
  const [showDeleteCommentBtn, setShowDeleteCommentBtn] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await (
          await backendApi.findUser(props.comment.userId)
        ).data;
        setChannel(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [backendApi, props.comment.userId]);

  const deleteCommentHandler = async () => {
    try {
      await backendApi.deleteComment(props.comment._id);
      props.deleteComment();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      onMouseEnter={() => {
        setShowMore(true);
      }}
      onMouseLeave={() => {
        setShowMore(false);
      }}
    >
      <Wrapper>
        <Avatar src={channel.img} />
        <Details>
          <Name>
            {channel.name}
            <Date>{moment(props.comment.createdAt).fromNow()}</Date>
          </Name>
          <Text>{props.comment.desc}</Text>
        </Details>
      </Wrapper>
      <div style={{ display: "flex" }}>
        {showDeleteCommentBtn ? (
          <Button
            onMouseLeave={() => {
              setShowDeleteCommentBtn(false);
            }}
            onClick={deleteCommentHandler}
          >
            <DeleteIcon fontSize="small" />
            <div style={{ marginTop: "5px" }}>Delete</div>
          </Button>
        ) : null}
        {showMore && props.comment.userId === currentUser?._id ? (
          <MoreVertIcon
            style={{ color: "white" }}
            onClick={() => {
              setShowDeleteCommentBtn(!showDeleteCommentBtn);
            }}
          />
        ) : null}
      </div>
    </Container>
  );
};

export default SingleComment;
