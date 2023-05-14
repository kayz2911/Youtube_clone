import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  Container,
  Content,
  VideoWrapper,
  Title,
  Details,
  Info,
  Buttons,
  Button,
  Channel,
  ChannelInfo,
  Hr,
  Image,
  ChannelDetail,
  ChannelName,
  ChannelCounter,
  Description,
  Subscribe,
} from "./VideoStyled";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Recommendation from "../../components/Recommendation/Recommendation";
import Comments from "../../components/Comment/Comments";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import { userActions } from "../../store/userSlice";
import { videoActions } from "../../store/videoSlice";
import useBackendApi from "../../hooks/useBackendApi";
import moment from "moment";
import RequireAuth from "../../components/Modal/RequireAuth/RequireAuth";

const Video = () => {
  const backendApi = useBackendApi();
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const [channel, setChannel] = useState({});
  const [showRequireAuthModal, setShowRequireAuthModal] = useState(false);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await (await backendApi.findSingleVideo(path)).data;
        const channelRes = await (
          await backendApi.findUser(videoRes.userId)
        ).data;
        setChannel(channelRes);
        dispatch(videoActions.fetchSuccess(videoRes));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [backendApi, dispatch, path]);

  const handleLikeClick = async () => {
    if (!currentUser) {
      setShowRequireAuthModal(true);
    } else {
      try {
        await backendApi.likeVideo(currentVideo._id);
        dispatch(videoActions.like(currentVideo._id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDislikeClick = async () => {
    if (!currentUser) {
      setShowRequireAuthModal(true);
    } else {
      try {
        await backendApi.dislikeVideo(currentVideo._id);
        dispatch(videoActions.dislike(currentVideo._id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubscribeUser = async () => {
    if (!currentUser) {
      setShowRequireAuthModal(true);
    } else {
      try {
        currentUser.subscribedUsers?.includes(channel._id)
          ? await backendApi.unsubscribeUser(channel._id)
          : await backendApi.subscribeUser(channel._id);
        dispatch(userActions.subscription(channel._id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const videoPage = currentVideo ? (
    <>
      <Container>
        <Content>
          <VideoWrapper>
            <iframe
              width="100%"
              height="500"
              src={currentVideo.videoUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ border: "none" }}
            ></iframe>
          </VideoWrapper>
          <Title>{currentVideo.title}</Title>
          <Details>
            <Info>
              {Intl.NumberFormat("en-US", {
                notation: "compact",
                maximumFractionDigits: 0,
              }).format(currentVideo.views)}{" "}
              views . {moment(currentVideo.createdAt).fromNow()}
            </Info>
            <Buttons>
              <Button>
                <Button onClick={handleLikeClick}>
                  {currentVideo.likes?.includes(currentUser?._id) ? (
                    <ThumbUpIcon />
                  ) : (
                    <ThumbUpOutlinedIcon />
                  )}
                  {currentVideo.likes?.length}
                </Button>
                <Button onClick={handleDislikeClick}>
                  {currentVideo.dislikes?.includes(currentUser?._id) ? (
                    <ThumbDownIcon />
                  ) : (
                    <ThumbDownOffAltOutlinedIcon />
                  )}
                  {currentVideo.dislikes?.length}
                </Button>
                <Button>
                  <ReplyOutlinedIcon /> Share
                </Button>
                <Button>
                  <AddTaskOutlinedIcon /> Save
                </Button>
              </Button>
            </Buttons>
          </Details>
          <Hr />
          <Channel>
            <ChannelInfo>
              <Image src={channel.img} />
              <ChannelDetail>
                <ChannelName>{channel.name}</ChannelName>
                <ChannelCounter>
                  {Intl.NumberFormat("en-US", {
                    notation: "compact",
                    maximumFractionDigits: 1,
                  }).format(channel.subscribers)}{" "}
                  subscribers
                </ChannelCounter>
                <Description>{currentVideo.desc}</Description>
              </ChannelDetail>
            </ChannelInfo>
            {currentVideo.userId !== currentUser?._id ? (
              <Subscribe
                onClick={handleSubscribeUser}
                style={{
                  backgroundColor: currentUser?.subscribedUsers?.includes(
                    channel._id
                  )
                    ? "#999"
                    : "#cc1a00",
                }}
              >
                {currentUser?.subscribedUsers?.includes(channel._id)
                  ? "UNSUBSCRIBE"
                  : "SUBSCRIBE"}
              </Subscribe>
            ) : (
              ""
            )}
          </Channel>
          <Hr />
          <Comments videoId={currentVideo._id} />
        </Content>
        <Recommendation currentVideo={currentVideo} />
      </Container>
      {showRequireAuthModal && (
        <RequireAuth setShowRequireAuthModal={setShowRequireAuthModal} />
      )}
    </>
  ) : (
    <LoadingSpinner />
  );

  return videoPage;
};

export default Video;
