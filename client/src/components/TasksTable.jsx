import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useTasks from "../hooks/findTasksByIntervalAndUser";
import useUsersProjects from "../hooks/findUsersProjects";
import formatDateForDatabase from "../utils/dates/formatDateForDatabase";
import formatDateForUser from "../utils/dates/formatDateForUser";
import generateMonthDates from "../utils/dates/generateMonthDates";
import Cookies from "universal-cookie";

function TasksTable({ id }) {
  const cookies = new Cookies();
  let user = cookies.get("user");

  let currentDate = new Date();
  let task = useTasks(
    id,
    formatDateForDatabase(currentDate) - 1,
    formatDateForDatabase(generateMonthDates().lastDay),
    user.specialRights
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
        status: e.Event.label,
      };
    });
    let dict = new Map();
    tasks.forEach((taskOne) => {
      dict.set(taskOne.id, taskOne);
    });
    tasks = Array.from(dict.values());
  }
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
export default TasksTable;
