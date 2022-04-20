import React, { useEffect, useState } from "react";

export default function useEventDepPj(projectId, departmentId, type) {
  const [event, setEvent] = useState(null);
  let URL =
    "http://localhost:3031/api/events/department/" +
    departmentId +
    "/project/" +
    projectId +
    "/" +
    type;

  console.log(URL);
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
