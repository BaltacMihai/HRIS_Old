import React, { useEffect, useState } from "react";

export default function useMeetings(userId, startingDate, endingDate, role) {
  const [event, setEvent] = useState(null);

  console.log(role);
  let URL;
  if (role != "SUPPORT")
    URL =
      "http://localhost:3031/api/events-allocation/" +
      userId +
      "/" +
      startingDate +
      " 00:00:00" +
      "/" +
      endingDate +
      " 23:59:59" +
      "/MEETING";
  else {
    URL = "http://localhost:3031/api/events-allocation/" + "MEETING";
  }
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
