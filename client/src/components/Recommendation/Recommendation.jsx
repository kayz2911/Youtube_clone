import React, { useState, useEffect, Suspense } from "react";
import { Container } from "./RecommendationStyled";
import InfiniteScroll from "../../components/InfiniteScroll/InfiniteScroll";
import useBackendApi from "../../hooks/useBackendApi";
import CardLoader from "../../components/Card/CardLoader";
const Card = React.lazy(() => import("../../components/Card/Card"));

const Recommendation = (props) => {
  const backendApi = useBackendApi();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(props.currentVideo);

  useEffect(() => {
    const loadVideos = async (pageNumber) => {
      try {
        const { data } = await await backendApi.getSimilarVideos(
          currentVideo.tags,
          pageNumber
        );
        setVideos((prevVideos) => [
          ...prevVideos,
          ...data.docs.filter((v) => v._id !== currentVideo._id),
        ]);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.log(error);
      }
    };
    loadVideos(page);
  }, [backendApi, currentVideo, page]);

  useEffect(() => {
    setCurrentVideo(props.currentVideo);
    setVideos([]);
    setPage(1);
  }, [props.currentVideo]);

  return (
    <Container>
      <InfiniteScroll
        fetchMore={() => setPage((prev) => prev + 1)}
        hasMore={page < totalPages}
      >
        {videos.map((video, i) => (
          <Suspense key={i} fallback={<CardLoader />}>
            <Card type="sm" key={video._id} video={video} />
          </Suspense>
        ))}
      </InfiniteScroll>
    </Container>
  );
};

export default Recommendation;
