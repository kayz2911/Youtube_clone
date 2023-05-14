import React, { useState, useEffect, Suspense } from "react";
import { Container } from "./HomeStyled";
import useBackendApi from "../../hooks/useBackendApi";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import ItemNotFound from "../../components/HandleError/ItemNotFound";
import InfiniteScroll from "../../components/InfiniteScroll/InfiniteScroll";
import CardLoader from "../../components/Card/CardLoader";
const Card = React.lazy(() => import("../../components/Card/Card"));

const Home = (props) => {
  const backendApi = useBackendApi();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState(props.type);

  useEffect(() => {
    const loadVideos = async (pageNumber) => {
      try {
        const { data } = await backendApi.getListVideos(type, pageNumber);
        setVideos((prevVideos) => [...prevVideos, ...data.docs]);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadVideos(page);
  }, [backendApi, type, page]);

  useEffect(() => {
    setType(props.type);
    setVideos([]);
    setPage(1);
    setLoading(true);
  }, [props.type]);

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
          hasMore={page < totalPages}
        >
          <Container>
            {videos.map((video, index) => (
              <Suspense key={index} fallback={<CardLoader />}>
                <Card video={video} />
              </Suspense>
            ))}
          </Container>
        </InfiniteScroll>
      )}
    </>
  );
};

export default Home;
