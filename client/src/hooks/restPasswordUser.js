export default async function resetPasswordUser(body) {
  const URL = "http://localhost:3031/api/users/reset-password";

  await fetch(URL, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((result) => {
      let addresses = result.email;
      let subject = "Your password has been successfully reset";

      let emailBody = `Hello ${result.name},  
      
      %0A %0A Your password has been successfully reset, you can log in to the platform using the following credentials: %22 ${result.username}%22 and password: %22 ${result.password}%22.

      %0A %0A This action was done by the Support team, if you did not request the password reset, please talk to any member of the support team for more details.
      
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
