import React, { useEffect, useState } from "react";

export default function useProjectDepartments(id) {
  const [project, setProject] = useState(null);
  const URL = "http://localhost:3031/api/projects/" + id + "/departments";

  useEffect(() => {
    if (project == null)
      fetch(URL, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((result) => {
          setProject(result);
        })
        .catch((error) => {
          console.log(error);
        });
  });

  if (project != null) {
    return project;
  }
}
