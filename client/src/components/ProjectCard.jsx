import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function ProjectCard({ name, role, id, color }) {
  let location = "/project/" + id;
  useEffect(() => {
    let projectColor = document.getElementById(name + "-" + id);
    projectColor.style.backgroundColor = color;
  });

  switch (role) {
    case "EMPLOYEE":
      role = "Employee";
      break;
    case "TEAM_LEAD":
      role = "Team Lead";
      break;
    case "PROJECT_MANAGER":
      role = "Project Manager";
      break;
  }
  return (
    <Link to={location}>
      <div className="project_card" id={name + "-" + id}>
        <p className="project_card_title">{name}</p>
        <p className="project_card_role"> {role}</p>
      </div>
    </Link>
  );
}

export default ProjectCard;
