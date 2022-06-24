import React, { useEffect, useState } from "react";

export default function useUserLastReport(userId) {
  const [user, setUser] = useState(null);
  const URL = "http://localhost:3031/api/users/report/" + userId + "/last";

  useEffect(() => {
    if (user == null)
      fetch(URL, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((result) => {
          setUser(result);
        })
        .catch((error) => {
          console.log(error);
        });
  });
  if (user != null) {
    return user;
  }
}
