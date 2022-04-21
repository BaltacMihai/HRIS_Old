export default async function getUserProjects(id) {
  const URL = "http://localhost:3031/api/projects/user/" + id;

  await fetch(URL, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then((res) => res.json())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(error);
    });
}
