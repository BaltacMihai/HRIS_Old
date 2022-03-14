import React from "react";

function Navbar() {
  return (
    <div className="navbar">
      <h1 className="navbar_title">Planner</h1>
      <div className="navbar_options">
        <div className="navbar_options_option  navbar_options_option-active">
          <span className="icon-home"></span>
          <p>Dashboard</p>
        </div>
        <div className="navbar_options_option">
          <span className="icon-briefcase"></span>
          <p>Tasks</p>
        </div>
        <div className="navbar_options_option">
          <span className="icon-users"></span>
          <p>Meetings</p>
        </div>
        <div className="navbar_options_option">
          <span className="icon-files-empty"></span>
          <p>Projects</p>
        </div>
        <div className="navbar_options_option">
          <span className="icon-calendar"></span>
          <p>Calendar</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
