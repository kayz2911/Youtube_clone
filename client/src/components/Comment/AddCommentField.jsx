import React, {useState} from "react";
import { Container, Button } from "./AddCommentFieldStyled";
import useBackendApi from "../../hooks/useBackendApi";
import Alert from "../Modal/Alert/Alert"

const AddCommentField = (props) => {
  const backendApi = useBackendApi();
  const [showAlertToxicComment , setShowAlertToxicComment] = useState(false);
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
        setTitle("Toxic comment detection");
        setContent(error.response.data.error);
        setShowAlertToxicComment(true);
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
      {showAlertToxicComment ? <Alert title={title} content={content} setShowAlert={setShowAlertToxicComment}/> : null}
    </Container>
  );
};

export default AddCommentField;
