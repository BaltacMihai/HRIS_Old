import React, { useEffect, useState } from "react";

export default function useProjectDepartment(projectId, departmentId) {
  const [project, setProject] = useState(null);
  const URL =
    "http://localhost:3031/api/project-allocation/" +
    projectId +
    "/department/" +
    departmentId;

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
