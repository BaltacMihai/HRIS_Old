import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function TaskCard({ name, project, deadline, id, color }) {
  useEffect(() => {
    let projectColor = document.getElementById(name + "-" + id);
    projectColor.style.backgroundColor = color;
  });
  let location = "/task/" + id;

  return (
    <Link to={location}>
      <div className="task">
        <p className="task_name">{name}</p>
        <p className="task_project" id={name + "-" + id}>
          {project}
        </p>
        <div className="task_infos">
          <div className="meetingsCard_infos_details_date">
            <span className="icon-calendar"></span>
            <p>{deadline}</p>
          </div>
          {/* TODO: Here I need to post the user */}
        </div>
      </div>
    </Link>
  );
}

export default TaskCard;
