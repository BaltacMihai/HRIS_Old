import React, { useEffect, useState } from "react";

export default function useUsers(departmentId) {
  const [user, setUser] = useState(null);
  let URL = "http://localhost:3031/api/users";

  if (departmentId) URL += "/department/" + departmentId;

  console.log(URL);

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
