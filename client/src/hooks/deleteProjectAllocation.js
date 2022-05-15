export default async function deleteProjectAllocation(projectId, userId) {
  const URL = "http://localhost:3031/api/project-allocation/delete";
  console.log(projectId, userId);

  await fetch(URL, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
    body: JSON.stringify({
      projectId: projectId,
      userId: userId,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
}
