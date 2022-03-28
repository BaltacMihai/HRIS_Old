import React, { useEffect, useState } from "react";

export default function useOtherProjects(userId) {
  const [event, setEvent] = useState(null);
  const URL = "http://localhost:3031/api/projects/not-user/" + userId;

  useEffect(() => {
    if (event == null)
      fetch(URL, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((result) => {
          setEvent(result);
        })
        .catch((error) => {
          console.log(error);
        });
  });
  if (event != null) {
    return event;
  }
}
