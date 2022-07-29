import React from "react";
import loginIllustration from "../assets/image/login.svg";
import loginBackground from "../assets/image/loginBackground.svg";
import Modal from "../components/Modal";
import login from "../hooks/login";
import displayStatusModal from "../utils/displayStatusModal";

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
      <Modal
        id="seeForgotPasswordModal"
        title="Forgot Password"
        text=" Please contact the support team to reset the password"
      />
    </div>
  );
}

export default Login;
