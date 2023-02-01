import React from "react";
import {
  Container,
  Wrapper,
  Close,
  Title,
  Input,
  Description,
  Button,
  Label,
} from "./UploadModalStyled";

const UploadModal = (props) => {
  return (
    <Container>
      <Wrapper>
        <Close
          onClick={() =>
            props.setShowUploadVideoModal
              ? props.setShowUploadVideoModal(false)
              : ""
          }
        >
          X
        </Close>
        <Title>Upload a New Video</Title>
        <Label>Video:</Label>
        <Input type="file" accept="video/*" />
        <Input type="text" placeholder="Title" />
        <Description placeholder="Description" rows={8} />
        <Input type="text" placeholder="Separate the tags with commas." />
        <Label>Image:</Label>
        <Input type="file" accept="image/*" />
        <Button>Upload</Button>
      </Wrapper>
    </Container>
  );
};

export default UploadModal;
