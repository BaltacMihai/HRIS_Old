import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";

export default async function login(username, password) {
  const cookies = new Cookies();
  const URL =
    "http://localhost:3031/api/users/login/" + username + "/" + password;

  fetch(URL, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((result) => {
      cookies.set("user", result.id, { path: "/", secure: true });
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
}
