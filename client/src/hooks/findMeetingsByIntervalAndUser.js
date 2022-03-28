import React, { useEffect, useState } from "react";

export default function useMeetings(userId, startingDate, endingDate) {
  const [event, setEvent] = useState(null);
  const URL =
    "http://localhost:3031/api/events-allocation/" +
    userId +
    "/" +
    startingDate +
    " 00:00:00" +
    "/" +
    endingDate +
    " 23:59:59" +
    "/MEETING";

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
