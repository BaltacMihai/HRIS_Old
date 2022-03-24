import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar({ current }) {
  useEffect(() => {
    if (current) {
      const active = document.getElementById(current);

      active.classList.add("navbar_options_option-active");
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

        <Link to="/projects">
          <div className="navbar_options_option" id="projects">
            <span className="icon-files-empty"></span>
            <p>Projects</p>
          </div>
        </Link>
        {/* <Link to="/calendar">
          <div className="navbar_options_option" id="calendar">
            <span className="icon-calendar"></span>
            <p>Calendar</p>
          </div>
        </Link> */}
      </div>
    </div>
  );
}

export default Navbar;
