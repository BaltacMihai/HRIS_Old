import React, { useEffect } from "react";
import useTasks from "../hooks/findTasksByIntervalAndUser";
import formatDateForDatabase from "../utils/dates/formatDateForDatabase";
import formatDateForUser from "../utils/dates/formatDateForUser";
import generateMonthDates from "../utils/dates/generateMonthDates";

function TasksTable({ id }) {
  let currentDate = new Date();
  let task = useTasks(
    id,
    formatDateForDatabase(currentDate),
    formatDateForDatabase(generateMonthDates().lastDay)
  );
  let tasks = null;

  if (task && tasks == null) {
    tasks = task.map((e) => {
      let endingDate = new Date(e.Event.endingDate);
      let startingDate = new Date(e.Event.startingDate);

      return {
        id: e.eventId,
        name: e.Event.name,
        project: e.Event.Project.name,
        color: e.Event.Project.color,
        ending: formatDateForUser(startingDate),
        beggining: formatDateForUser(endingDate),
        status: "Pending", //TODO: When reset the db, to include the status for the tasks
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
      <p className="task_table_header_item">Actions</p>
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
  return (
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
      <p className="task_table_content_entity_info task_table_content_entity_info-actions">
        ...
      </p>
    </div>
  );
}
export default TasksTable;
