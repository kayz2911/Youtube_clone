import React, { useEffect, useState, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { Container } from "./SearchStyled";
import InfiniteScroll from "../../components/InfiniteScroll/InfiniteScroll";
import useBackendApi from "../../hooks/useBackendApi";
import CardLoader from "../../components/Card/CardLoader";
const Card = React.lazy(() => import("../../components/Card/Card"));

const Search = () => {
  const backendApi = useBackendApi();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [videos, setVideos] = useState([]);
  const path = useLocation();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        if (path.search.startsWith("?q=")) {
          const videoData = await (
            await backendApi.searchVideos(path.search, page)
          ).data;
          setVideos((video) => [...video, ...videoData.docs]);
          setTotalPage(videoData.total_pages);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideo();
  }, [backendApi, path.search, page]);

  return (
    <InfiniteScroll
      fetchMore={() => setPage((prev) => prev + 1)}
      hasMore={page < totalPage}
    >
      <Container>
        {videos.map((video, i) => (
          <Suspense key={i} fallback={<CardLoader />}>
            <Card key={video._id} video={video} />
          </Suspense>
        ))}
      </Container>
    </InfiniteScroll>
  );
};

export default Search;
