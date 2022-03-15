import React, { useEffect, useState } from "react";

export default function useEvents(userId, startingDate, endingDate) {
  const [event, setEvent] = useState(null);
  const URL =
    "http://localhost:3031/api/events-allocation/" +
    userId +
    "/" +
    startingDate +
    "/" +
    endingDate;

  console.log(event);

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
