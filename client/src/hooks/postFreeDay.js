import { useState } from "react";

export default async function FreeDay(id, departmentId, date) {
  let freeDayData = {
    departmentId: departmentId,
    startingDate: date,
    endingDate: date,
    userId: id,
  };

  let infos = null;
  const URL = "http://localhost:3031/api/events-allocation/post-free-day";

  if (infos == null)
    await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(freeDayData),
    })
      .then((res) => res.json())
      .then((result) => {
        infos = result;
      })
      .catch((error) => {
        console.log(error);
      });

  if (infos != null) {
    return infos;
  }
}
