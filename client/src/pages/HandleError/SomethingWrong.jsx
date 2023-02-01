import React from "react";
import { Container, ErrorContent } from "./ErrorStyled";

const SomethingWrong = () => {
  return (
    <Container>
      <ErrorContent>Something went wrong.Retry later</ErrorContent>
    </Container>
  );
};

export default SomethingWrong;
