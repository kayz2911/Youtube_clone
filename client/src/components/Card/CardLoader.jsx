import React from "react";
import {
  Container,
  Image,
  Details,
  ChannelImage,
  Texts,
  Title,
  ChannelName,
  Info,
} from "./CardStyled";

const CardLoader = (props) => {
  return (
    <Container type={props.type}>
      <Image type={props.type}  />
      <Details type={props.type}>
        <ChannelImage type={props.type} />
        <Texts>
          <Title></Title>
          <ChannelName></ChannelName>
          <Info>
          </Info>
        </Texts>
      </Details>
    </Container>
  );
};

export default CardLoader;
