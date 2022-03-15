import React from "react";

function TaskCard({ name, project, deadline }) {
  return (
    <div className="task">
      <p className="task_name">{name}</p>
      <p className="task_project">{project}</p>
      <div className="task_infos">
        <p className="task_infos_date">{deadline}</p>
        {/* TODO: Here I need to post the user */}
      </div>
    </div>
  );
}

export default TaskCard;
