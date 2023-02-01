import React, { useState, useEffect, useCallback, Suspense } from "react";
import { Container } from "./HomeStyled";
import useBackendApi from "../../hooks/useBackendApi";
import Loading from "../HandleError/Loading";
const Card = React.lazy(() => import("../../components/Card/Card"));

const Home = (props) => {
  const backendApi = useBackendApi();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const loadVideo = async () => {
      try {
        
        const videoData = (await backendApi.getListVideos(props.type, page))
          .data;
        setVideos(videoData.docs);
        setTotalPage(videoData.total_pages);
      } catch (error) {
        console.log(error);
      }
    };
    loadVideo();
  }, [backendApi, props.type, page]);

  const loadMore = async () => {
    try {
      let params = page + 1;
      const videoData = (await backendApi.getListVideos(props.type, params)).data;
      setVideos((video) => [...video, ...videoData.docs]);
      setPage(page + 1);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleScroll = useCallback(
  //   async (e) => {
  //     const scrollHeight = e.target.documentElement.scrollHeight;
  //     const currentHeight = Math.ceil(
  //       e.target.documentElement.scrollTop + window.innerHeight
  //     );
  //     if (currentHeight + 1 >= scrollHeight) {
  //       setPage(page + 1);
  //     }
  //   },
  //   [page]
  // );

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [handleScroll]);

  return (
    <Container>
      {videos.map((video, i) => (
        <Suspense key={i} fallback={<Loading></Loading>}>
          <Card video={video} />
        </Suspense>
      ))}
      {page < totalPage ? <button onClick={loadMore}>Load More</button> : null}
    </Container>
  );
};

export default Home;
