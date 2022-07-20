import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

function Navbar() {
  const cookies = new Cookies();
  let user = cookies.get("user");

  useEffect(() => {
    if (user.specialRights == "SUPPORT") {
      const logOutBtn = document.getElementById("logOut");

      logOutBtn.style.marginTop = "46vh";
    }
  });
  return (
    <div className="navbar">
      <h1 className="navbar_title">Planner</h1>

      <div className="navbar_options">
        <Link to="/">
          <div className="navbar_options_option" id="dashboard">
            <span className="icon-home"></span>
            <p>Dashboard</p>
          </div>
        </Link>

        <Link to="/tasks">
          <div className="navbar_options_option" id="tasks">
            <span className="icon-briefcase"></span>
            <p>Tasks</p>
          </div>
        </Link>

        <Link to="/meetings">
          <div className="navbar_options_option" id="meetings">
            <span className="icon-users"></span>
            <p>Meetings</p>
          </div>
        </Link>
        {returnNavbar(user.specialRights)}
        <Link to="/projects">
          <div className="navbar_options_option" id="projects">
            <span className="icon-folder-open"></span>
            <p>Projects</p>
          </div>
        </Link>

        {/* <Link to="/calendar">
          <div className="navbar_options_option" id="calendar">
            <span className="icon-calendar"></span>
            <p>Calendar</p>
          </div>
        </Link> */}
        <div
          className="navbar_options_option"
          id="logOut"
          onClick={(e) => {
            cookies.remove("user");
            window.location.href = "http://localhost:3000/";
          }}
        >
          <span className="icon-exit"></span>
          <p>Log out</p>
        </div>
      </div>
    </div>
  );
}

function returnNavbar(role) {
  if (role != "EMPLOYEE") {
    if (role != "SUPPORT")
      return (
        <Link to="/reports">
          <div className="navbar_options_option" id="reports">
            <span className="icon-stats-bars"></span>
            <p>Reports</p>
          </div>
        </Link>
      );
    else {
      return (
        <React.Fragment>
          <Link to="/freeDay">
            <div className="navbar_options_option" id="freeDay">
              <span className="icon-clock"></span>
              <p>Free Days</p>
            </div>
          </Link>
          <Link to="/reports">
            <div className="navbar_options_option" id="reports">
              <span className="icon-cog"></span>
              <p>HR Admin</p>
            </div>
          </Link>
        </React.Fragment>
      );
    }
  } else {
    return (
      <Link to="/search">
        <div className="navbar_options_option" id="reports">
          <span className="icon-user"></span>
          <p>Users</p>
        </div>
      </Link>
    );
  }
}

export default Navbar;
