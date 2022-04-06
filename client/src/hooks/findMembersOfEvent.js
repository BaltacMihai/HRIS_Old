import React, { useEffect, useState } from "react";

export default function useMembers(eventId) {
  const [event, setEvent] = useState(null);
  const URL = "http://localhost:3031/api/events-allocation/get/" + eventId;

  useEffect(() => {
    if (event == null)
      fetch(URL, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
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
