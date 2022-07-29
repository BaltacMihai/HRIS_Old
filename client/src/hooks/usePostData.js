/**
 * Custom hook that help to create post requests.
 *
 * @param {URL} URL  - the request url, use the routes from the  routes.js
 * @param {json} body - the request body
 * @param {function} goodReq - if the request is successful. by default reload the page
 * @param {function} badReq - if the request is unsuccessful, by default do nothing
 */

export default async function usePostData(
  URL,
  body,
  goodReq = window.location.reload(),
  badReq = void 0
) {
  await fetch(URL, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((result) => {
      goodReq();
    })
    .catch((error) => {
      console.log(error);
      badReq();
    });
}
