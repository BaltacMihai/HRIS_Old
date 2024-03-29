export default async function useDelete(URL) {
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
