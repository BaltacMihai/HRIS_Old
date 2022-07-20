import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useTasks from "../hooks/findTasksByIntervalAndUser";
import useEventDepPj from "../hooks/useEventDepPj";
import formatDateForUser from "../utils/dates/formatDateForUser";
import generateMonthDates from "../utils/dates/generateMonthDates";

function TasksTableDepPj({ projectId, departmentId }) {
  let task = useEventDepPj(projectId, departmentId, "TASK");
  console.log(task);
  let tasks = null;

  if (task && tasks == null) {
    tasks = task.map((e) => {
      let endingDate = new Date(e.endingDate);
      let startingDate = new Date(e.startingDate);

      return {
        id: e.id,
        name: e.name,
        project: e.Project.name,
        color: e.Project.color,
        ending: formatDateForUser(startingDate),
        beggining: formatDateForUser(endingDate),
        status: e.label,
      };
    });
  }
  console.log(tasks);
  if (tasks)
    return (
      <div className="task_table">
        {returnTableHeader()}
        {returnTableContent(tasks)}
      </div>
    );
  else {
    return <div className="task_table">{returnTableHeader()}</div>;
  }
}

function returnTableHeader() {
  return (
    <div className="task_table_header">
      <p className="task_table_header_item">Project</p>
      <p className="task_table_header_item">Task</p>
      <p className="task_table_header_item">Progress</p>
      <p className="task_table_header_item">Start task</p>
      <p className="task_table_header_item">Deadline</p>
    </div>
  );
}

function returnTableContent(tasks) {
  console.log(tasks);
  return (
    <div className="task_table_content">
      {tasks.map((e) => {
        return (
          <Entity
            id={e.id}
            project={e.project}
            name={e.name}
            status={e.status}
            beggining={e.beggining}
            ending={e.ending}
            color={e.color}
          />
        );
      })}
    </div>
  );
}

function Entity({ project, name, status, beggining, ending, color, id }) {
  useEffect(() => {
    let projectColor = document.getElementById(name + "-" + id);
    projectColor.style.backgroundColor = color;
  });
  let location = "/task/" + id;

  return (
    <Link to={location}>
      <div className="task_table_content_entity">
        <p className="task_table_content_entity_info">
          <p
            className="task_table_content_entity_info-project"
            id={name + "-" + id}
          >
            {project}
          </p>
        </p>
        <p className="task_table_content_entity_info">{name}</p>
        <p className="task_table_content_entity_info">{status}</p>
        <p className="task_table_content_entity_info">{beggining}</p>
        <p className="task_table_content_entity_info">{ending}</p>
      </div>
    </Link>
  );
}
export default TasksTableDepPj;
