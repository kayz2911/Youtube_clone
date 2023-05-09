import React, {useState} from "react";
import { Container, Button } from "./AddCommentFieldStyled";
import useBackendApi from "../../hooks/useBackendApi";
import Notification from "../../components/Modal/Notification/Notification"

const AddCommentField = (props) => {
  const backendApi = useBackendApi();
  const [showNotification , setShowNotification] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");


  const addCommentHandler = async () => {
    try {
      const res = await backendApi.addComment(props.videoId, props.desc);
      if (res?.status === 201) {
        props.comments.splice(0, 0, res.data);
      }
      props.onCancelComment();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setTitle("Toxic comment error");
        setContent(error.response.data.error);
        setShowNotification(true);
      } else {
        console.log(error);
      }
    }
  };

  const cancelCommentHandler = () => {
    return props.onCancelComment();
  };

  return (
    <Container>
      <Button onClick={cancelCommentHandler}>Cancel</Button>
      <Button onClick={addCommentHandler}>Comment</Button>
      {showNotification ? <Notification title={title} content={content} setShowNotification={setShowNotification}/> : null}
    </Container>
  );
};

export default AddCommentField;
