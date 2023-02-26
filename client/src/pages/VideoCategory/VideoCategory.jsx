import React, { useEffect, useState, Suspense } from "react";
import { Container } from "./VideoCategoryStyled";

import useBackendApi from "../../hooks/useBackendApi";
import { useLocation } from "react-router-dom";
import Loading from "../../components/HandleError/Loading";
import InfiniteScroll from "../../components/InfiniteScroll/InfiniteScroll";
import CardLoader from "../../components/Card/CardLoader";
const Card = React.lazy(() => import("../../components/Card/Card"));

const VideoCategory = () => {
  const backendApi = useBackendApi();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [videos, setVideos] = useState([]);
  let tag = useLocation().pathname.split("/")[3];

  useEffect(() => {
    const loadVideos = async (pageNumber) => {
      try {
        const { data } = await (
          await backendApi.getSimilarVideos(tag, pageNumber)
        );
        setVideos((prevVideos) => [...prevVideos, ...data.docs]);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.log(error);
      }
    };
    loadVideos(page);
  }, [backendApi, tag, page]);

  useEffect(() => {
    setVideos([]);
    setPage(1);
  }, [tag]);

  const videoCategory =
    videos.length !== 0 ? (
      <InfiniteScroll
        fetchMore={() => setPage((prev) => prev + 1)}
        hasMore={page < totalPages}
      >
        <Container>
          {videos.map((video, i) => (
            <Suspense key={i} fallback={<CardLoader />}>
              <Card key={video._id} video={video} />
            </Suspense>
          ))}
        </Container>
      </InfiniteScroll>
    ) : (
      <Loading />
    );

  return videoCategory;
};

export default VideoCategory;
