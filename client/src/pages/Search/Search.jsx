import React, { useEffect, useState } from "react";
import { Container } from "./SearchStyled";

import useBackendApi from "../../hooks/useBackendApi";
import { useLocation } from "react-router-dom";
import Card from "../../components/Card/Card";

const Search = () => {
  const backendApi = useBackendApi();
  const [videos, setVideos] = useState([]);
  const path = useLocation();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        if (path.search.startsWith("?q=")) {
          const res = await (await backendApi.searchVideos(path.search)).data;
          setVideos(res ? res : []);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideo();
  }, [backendApi, path.search]);

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Search;
