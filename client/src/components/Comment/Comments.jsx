import React, { useState, useEffect } from "react";
import SingleComment from "./SingleComment";
import { Container, Avatar, NewComment, Input, Button } from "./CommentsStyled";
import AddCommentField from "./AddCommentField";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useBackendApi from "../../hooks/useBackendApi";

const Comments = (props) => {
  const backendApi = useBackendApi();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [commentDesc, setCommentDesc] = useState("");
  const [showAddCommentBtn, setShowAddCommentBtn] = useState(false);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await (await backendApi.getAllComments(props.videoId)).data;
        setComments(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchComment();
  }, [backendApi, props.videoId]);

  const changeValueHandler = (e) => {
    setCommentDesc(e.target.value);
    setShowAddCommentBtn(e.target.value !== "" ? true : false);
  };

  const addComment = showAddCommentBtn ? (
    <AddCommentField
      videoId={props.videoId}
      comments={comments}
      desc={commentDesc}
      onCancelComment={() => {
        setCommentDesc("");
        setShowAddCommentBtn(false);
      }}
    />
  ) : (
    ""
  );

  return (
    <Container>
      {currentUser ? (
        <NewComment>
          <Avatar src={currentUser.img} />
          <Input
            placeholder="Add a comment..."
            value={commentDesc}
            onInput={changeValueHandler}
          />
          {addComment}
        </NewComment>
      ) : (
        <Button onClick={() => navigate("/login")}>
          <AccountCircleOutlinedIcon />
          Sign in to post new comment
        </Button>
      )}
      {comments.map((comment) => (
        <SingleComment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;
