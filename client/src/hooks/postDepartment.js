export default async function postDepartment(body) {
  const URL = "http://localhost:3031/api/departments/create";

  await fetch(URL, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((result) => {
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
}
