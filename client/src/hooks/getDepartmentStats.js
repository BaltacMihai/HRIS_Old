import React, { useEffect, useState } from "react";

export default function useDepartmentStats() {
  const [departamentStats, setDepartamentStats] = useState(null);
  const URL = "http://localhost:3031/api/departments/stats";

  useEffect(() => {
    if (departamentStats == null)
      fetch(URL, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((result) => {
          setDepartamentStats(result);
        })
        .catch((error) => {
          console.log(error);
        });
  });
  if (departamentStats != null) {
    return departamentStats;
  }
}
