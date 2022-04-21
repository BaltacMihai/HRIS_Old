export default async function modifyProject(body) {
  const URL = "http://localhost:3031/api/projects/put";

  await fetch(URL, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(body),
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
