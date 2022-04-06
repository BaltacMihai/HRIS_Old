export default async function modifyTask(eventId, label) {
  const URL = "http://localhost:3031/api/events/put/label";

  let body = {
    id: eventId,
    type: "TASK",
    label: label,
  };
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
