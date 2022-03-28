import { useEffect, useState } from "react";

export default function usePostEventsAllocation(userId, eventId) {
  let generatedEventAllocation = {
    userId: userId,
    eventId: eventId,
  };

  const [infos, setInfos] = useState(null);
  const URL = "http://localhost:3031/api/events-allocation/post";

  useEffect(() => {
    if (userId && infos == null)
      fetch(URL, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(generatedEventAllocation),
      })
        .then((res) => res.json())
        .then((result) => {
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
