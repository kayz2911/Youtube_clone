import React from "react";
import { Container, Button } from "./AddCommentFieldStyled";
import useBackendApi from "../../hooks/useBackendApi";

const AddCommentField = (props) => {
  const backendApi = useBackendApi();
  const addCommentHandler = async () => {
    try {
      const res = await backendApi.addComment(props.videoId, props.desc);
      props.comments.splice(0, 0, res.data);
      props.onCancelComment();
    } catch (error) {
      console.log(error);
    }
  };

  const cancelCommentHandler = () => {
    return props.onCancelComment();
  };

  return (
    <Container>
      <Button onClick={cancelCommentHandler}>Cancel</Button>
      <Button onClick={addCommentHandler}>Comment</Button>
    </Container>
  );
};

export default AddCommentField;
