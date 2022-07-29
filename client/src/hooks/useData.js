import React, { useEffect, useState } from "react";

export default function useData(url, parameters) {
  const [data, setData] = useState(null);

  console.log(URL);
  useEffect(() => {
    if (data == null)
      fetch(URL, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((result) => {
          setData(result);
        })
        .catch((error) => {
          console.log(error);
        });
  });
  if (data != null) {
    return data;
  }
}
