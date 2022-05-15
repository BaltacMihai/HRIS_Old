export default async function deleteProject(projectId) {
  const URL = "http://localhost:3031/api/projects/delete";

  await fetch(URL, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
    body: JSON.stringify({
      id: projectId,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      window.location.href = "http://localhost:3000/projects";
    })
    .catch((error) => {
      console.log(error);
    });
}
