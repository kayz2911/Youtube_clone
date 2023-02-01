import React, { useEffect, useState } from "react";
import { Container } from "./VideoCategoryStyled";

import useBackendApi from "../../hooks/useBackendApi";
import { useLocation } from "react-router-dom";
import Card from "../../components/Card/Card";
import PageNotFound from "../HandleError/PageNotFound";

const VideoCategory = () => {
  const backendApi = useBackendApi();
  const [videos, setVideos] = useState([]);
  const path = useLocation().pathname.split("/")[3];

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const videoRes = await (await backendApi.getSimilarVideos(path)).data;
        setVideos(videoRes ? videoRes : []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideo();
  }, [backendApi, path]);

  const videoCategory =
    videos.length !== 0 ? (
      <Container>
        {videos.map((video) => (
          <Card key={video._id} video={video} />
        ))}
      </Container>
    ) : (
      <PageNotFound />
    );

  return videoCategory;
};

export default VideoCategory;
