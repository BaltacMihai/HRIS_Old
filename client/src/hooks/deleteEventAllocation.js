export default async function deleteEventAllocation(eventId, userId) {
  const URL =
    "http://localhost:3031/api/events-allocation/delete/" +
    eventId +
    "/" +
    userId;
  console.log(eventId, userId);

  await fetch(URL, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
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
