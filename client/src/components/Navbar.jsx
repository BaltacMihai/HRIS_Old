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

  const navbarOptions = [
    {
      id: "dashboard",
      icon: "icon-home",
      name: "Dashboard",
      link: "/",
    },
    {
      id: "tasks",
      icon: "icon-briefcase",
      name: "Tasks",
      link: "/tasks",
    },
    {
      id: "meetings",
      icon: "icon-users",
      name: "Meetings",
      link: "/meetings",
    },
    {
      id: "projects",
      icon: "icon-folder-open",
      name: "Projects",
      link: "/projects",
    },
  ];

  switch (user.specialRights) {
    case "EMPLOYEE":
      navbarOptions.push({
        id: "reports",
        icon: "icon-user",
        name: "Users",
        link: "/search",
      });
      break;
    case "CEO":
      navbarOptions.push({
        id: "reports",
        icon: "icon-stats-bars",
        name: "Reports",
        link: "/reports",
      });
      break;
    case "SUPPORT":
      navbarOptions.push({
        id: "freeDay",
        icon: "icon-clock",
        name: "Free Days",
        link: "/freeDay",
      });
      navbarOptions.push({
        id: "reports",
        icon: "icon-cog",
        name: "HR Admin",
        link: "/reports",
      });

      break;
  }

  console.log(navbarOptions);

  return (
    <div className="navbar">
      <h1 className="navbar_title">Planner</h1>

      <div className="navbar_options">
        {navbarOptions?.map((option) => {
          return (
            <Link to={option.link} key={option.id}>
              <div className="navbar_options_option" id={option.id}>
                <span className={option.icon}></span>
                <p>{option.name}</p>
              </div>
            </Link>
          );
        })}

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

export default Navbar;
