export default async function deleteFreeDay(
  userId,
  eventId,
  eventAllocationId
) {
  const URL = `http://localhost:3031/api/events-allocation/freeDay/delete/${userId}/${eventId}/${eventAllocationId}`;
  await fetch(URL, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      window.location.href = "http://localhost:3000/freeDay";
    })
    .catch((error) => {
      console.log(error);
    });
}
