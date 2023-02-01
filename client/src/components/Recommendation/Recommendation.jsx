import React, { useState, useEffect } from "react";
import { Container } from "./RecommendationStyled";
import Card from "../Card/Card";

import useBackendApi from "../../hooks/useBackendApi";

const Recommendation = (props) => {
  const backendApi = useBackendApi();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videoRes = await (
          await backendApi.getSimilarVideos(props.currentVideo.tags)
        ).data;
        videoRes.splice(
          videoRes.findIndex((video) => video._id === props.currentVideo._id),
          1
        );
        setVideos(videoRes ? videoRes : []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideos();
  }, [backendApi, props.currentVideo.tags, props.currentVideo._id]);

  return (
    <Container>
      {videos.map((video) => (
        <Card type="sm" key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Recommendation;
