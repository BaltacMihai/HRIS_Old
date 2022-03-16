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
        <p className="task_infos_date">{deadline}</p>
        {/* TODO: Here I need to post the user */}
      </div>
    </div>
  );
}

export default TaskCard;
