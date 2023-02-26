import React, { useState, useEffect } from "react";
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
import { Link } from "react-router-dom";
import moment from "moment";
import useBackendApi from "../../hooks/useBackendApi";

const Card = (props) => {
  const [channel, setChannel] = useState({});
  const backendApi = useBackendApi();

  useEffect(() => {
    const getChannel = async () => {
      try {
        const userChannel = await backendApi.findUser(props.video.userId);
        setChannel(userChannel.data);
      } catch (error) {
        console.log(error);
      }
    };
    getChannel();
  }, [backendApi, props.video.userId]);

  return (
    <Link to={`/video/${props.video._id}`} style={{ textDecoration: "none" }}>
      <Container type={props.type}>
        <Image type={props.type} src={props.video.imgUrl} />
        <Details type={props.type}>
          <ChannelImage type={props.type} src={channel.img} />
          <Texts>
            <Title type={props.type}>{props.video.title}</Title>
            <ChannelName type={props.type}>{channel.name}</ChannelName>
            <Info type={props.type}>
              {Intl.NumberFormat("en-US", {
                notation: "compact",
                maximumFractionDigits: 0,
              }).format(props.video.views)}{" "}
              views . {moment(props.video.createdAt).fromNow()}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
