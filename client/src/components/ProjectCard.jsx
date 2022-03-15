import React from "react";

function ProjectCard({ name, role }) {
  return (
    <div className="project_card">
      <p className="project_card_title">{name}</p>
      <p className="project_card_role">Rol: {role}</p>
    </div>
  );
}

export default ProjectCard;
