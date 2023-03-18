import React, { useState, useEffect } from "react";

const FetchData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("https://swapi.dev/api/planets");
      console.log(res);
      const data = await res.json();
      setData(data.results);
    };
    getData();
  }, []);

  return (
    <>
      {data.map((d) => (
        <h6>{d.name}</h6>
      ))}
    </>
  );
};

export default FetchData;
