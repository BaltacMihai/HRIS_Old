import React from "react";
import loginIllustration from "../assets/image/login.svg";
import loginBackground from "../assets/image/loginBackground.svg";
import login from "../hooks/login";

function Login() {
  return (
    <div className="login_page">
      <div className="image">
        <img
          src={loginIllustration}
          alt="Login illustration"
          className="illustration"
        />
        <img
          src={loginBackground}
          alt="Login Background"
          className="background"
        />
      </div>
      <div className="form">
        <h1 className="title">Welcome</h1>
        <div className="input">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" />
        </div>
        <div className="input">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>
        <p
          className="forgetPass"
          onClick={() => {
            displayStatusModal("seeForgotPasswordModal", "flex");
          }}
        >
          Forgot Password?
        </p>
        <div
          className="button"
          onClick={(e) => {
            if (
              document.getElementById("username").value &&
              document.getElementById("password").value
            )
              login(
                document.getElementById("username").value,
                document.getElementById("password").value
              );
          }}
        >
          Login
        </div>
      </div>
      {returnForgotPasswordModal()}
    </div>
  );
}

function displayStatusModal(location, type) {
  let statusModal = document.getElementById(location);

  statusModal.style.display = type;
}
function returnForgotPasswordModal() {
  return (
    <div className="modal" id="seeForgotPasswordModal">
      <div className="modal_content">
        <span
          className="icon-cross close"
          onClick={(e) => {
            displayStatusModal("seeForgotPasswordModal", "none");
          }}
        ></span>
        <p className="title">Forgot Password</p>
        <p className="text_body">
          Please contact the support team to reset the password
        </p>
      </div>
    </div>
  );
}

export default Login;
