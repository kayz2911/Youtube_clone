import React from "react";
import { Container, ErrorContent } from "./ErrorStyled";

const ItemNotFound = () => {
  return (
    <Container>
      <ErrorContent>Item Not Found</ErrorContent>
    </Container>
  );
};

export default ItemNotFound;
