import { CREATE_USER_URL } from "../routes";

export default async function createUser(body) {
  const URL = CREATE_USER_URL;

  await fetch(URL, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((result) => {
      let addresses = result.email;
      let subject = "Congratulations, your account has been created";

      let emailBody = `Congratulations ${result.name},  
      
      %0A %0A You can access your account using the username: %22 ${result.username} %22 and password: %22 ${result.password} %22.

      %0A %0A For other details, please contact the support team.
      
      %0A %0A - This email was created automatically -`;

      let href =
        "mailto:" +
        addresses +
        "?" +
        "subject=" +
        subject +
        "&" +
        "body=" +
        emailBody;
      let wndMail;
      wndMail = window.open(
        href,

        "scrollbars=yes,resizable=yes,width=10,height=10"
      );
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
}
