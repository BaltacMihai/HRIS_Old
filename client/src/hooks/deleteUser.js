export default async function deleteUser(userId) {
  const URL = "http://localhost:3031/api/users/delete/" + userId;

  await fetch(URL, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      window.location.href = "http://localhost:3000/";
    })
    .catch((error) => {
      console.log(error);
    });
}
