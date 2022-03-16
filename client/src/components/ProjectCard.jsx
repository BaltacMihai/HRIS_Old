import React, { useEffect } from "react";

function ProjectCard({ name, role, id, color }) {
  useEffect(() => {
    let projectColor = document.getElementById(name + "-" + id);
    projectColor.style.backgroundColor = color;
  });
  return (
    <div className="project_card" id={name + "-" + id}>
      <p className="project_card_title">{name}</p>
      <p className="project_card_role">Rol: {role}</p>
    </div>
  );
}

export default ProjectCard;
