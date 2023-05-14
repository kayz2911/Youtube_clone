import React, { useEffect, useState, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { Container } from "./SearchStyled";
import InfiniteScroll from "../../components/InfiniteScroll/InfiniteScroll";
import useBackendApi from "../../hooks/useBackendApi";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import ItemNotFound from "../../components/HandleError/ItemNotFound";
import CardLoader from "../../components/Card/CardLoader";
const Card = React.lazy(() => import("../../components/Card/Card"));

const Search = () => {
  const backendApi = useBackendApi();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const path = useLocation();

  useEffect(() => {
    setLoading(true);
    setPage(1);
  }, [path.search]);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        if (path.search.startsWith("?q=")) {
          const videoData = await (
            await backendApi.searchVideos(path.search, page)
          ).data;
          if (page === 1) {
            setVideos(videoData.docs);
          } else {
            setVideos((video) => [...video, ...videoData.docs]);
          }
          setTotalPage(videoData.total_pages);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [backendApi, path.search, page]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {videos.length === 0 ? (
        <ItemNotFound />
      ) : (
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
      )}
    </>
  );
};

export default Search;
