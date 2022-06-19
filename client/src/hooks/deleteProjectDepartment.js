export default async function deleteProjectDepartment(projectId, departmentId) {
  const URL = "http://localhost:3031/api/project-allocation/deleteDepartment";

  let body = {
    projectId: projectId,
    departmentId: departmentId,
  };
  console.log(body);

  await fetch(URL, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
    body: JSON.stringify(body),
  })
    .then((result) => {
      console.log(result);
      window.location.href = "http://localhost:3000/project/" + projectId;
    })
    .catch((error) => {
      console.log(error);
    });
}
