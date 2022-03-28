import React, { useEffect, useState } from "react";

export default function usePostEvent(date) {
  let generatedEvent = {
    name: "Free Day",
    projectId: 0,
    description: "Free Day",
    departmentId: 0,
    startingDate: date,
    endingDate: date,
    type: "FREE-DAY",
  };

  const [infos, setInfos] = useState(null);
  const URL = "http://localhost:3031/api/events/post";

  useEffect(() => {
    if (infos == null)
      fetch(URL, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(generatedEvent),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setInfos(result);
        })
        .catch((error) => {
          console.log(error);
        });
  });
  if (infos != null) {
    return infos;
  }
}
