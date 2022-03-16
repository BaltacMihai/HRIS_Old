import React, { useEffect } from "react";

function TaskCard({ name, project, deadline, id, color }) {
  useEffect(() => {
    let projectColor = document.getElementById(name + "-" + id);
    projectColor.style.backgroundColor = color;
  });

  return (
    <div className="task">
      <p className="task_name">{name}</p>
      <p className="task_project" id={name + "-" + id}>
        {project}
      </p>
      <div className="task_infos">
        <div className="meetings_infos_details_date">
          <span className="icon-calendar"></span>
          <p>{deadline}</p>
        </div>
        {/* TODO: Here I need to post the user */}
      </div>
    </div>
  );
}

export default TaskCard;
