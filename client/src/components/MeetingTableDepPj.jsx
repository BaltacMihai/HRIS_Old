import React, { useEffect } from "react";
import generateMonthDates from "../utils/dates/generateMonthDates";
import formatDateForUser from "../utils/dates/formatDateForUser";
import formatHourForUser from "../utils/dates/formatHourForUser";
import { Link } from "react-router-dom";
import useData from "../hooks/useData";
import { EVENT_ALLOCATION_URL, EVENT_URL } from "../routes";

function MeetingsTableDepPj({ projectId, departmentId }) {
  let task = useData(
    EVENT_URL.GET_BY_DEPARTMENT_ID_PROJECT_ID_TYPE(
      projectId,
      departmentId,
      "MEETING"
    )
  );
  console.log(task);
  let tasks = null;

  if (task && tasks == null) {
    tasks = task.map((e) => {
      let date = new Date(e.startingDate);

      return {
        id: e.id,
        project: e.Project.name,
        name: e.name,
        color: e.Project.color,
        day: formatDateForUser(date),
        hour: formatHourForUser(date),
      };
    });
  }
  console.log(tasks);
  if (tasks)
    return (
      <div className="meeting_table">
        {returnTableHeader()}
        {returnTableContent(tasks)}
      </div>
    );
  else {
    return <div className="meeting_table">{returnTableHeader()}</div>;
  }
}

function returnTableHeader() {
  return (
    <div className="meeting_table_header">
      <p className="meeting_table_header_item">Project</p>
      <p className="meeting_table_header_item">Meeting Subject</p>
      <p className="meeting_table_header_item">Day</p>
      <p className="meeting_table_header_item">Hour</p>
    </div>
  );
}

function returnTableContent(tasks) {
  console.log(tasks);
  return (
    <div className="meeting_table_content">
      {tasks.map((e) => {
        return (
          <Entity
            id={e.id}
            project={e.project}
            name={e.name}
            hour={e.hour}
            color={e.color}
            day={e.day}
          />
        );
      })}
    </div>
  );
}

function Entity({ project, name, day, hour, id, color }) {
  useEffect(() => {
    let projectColor = document.getElementById(name + "-" + id);
    projectColor.style.backgroundColor = color;
  });
  let location = "/meeting/" + id;
  return (
    <Link to={location}>
      <div className="meeting_table_content_entity">
        <p className="meeting_table_content_entity_info meeting_table_content_entity_info-project">
          <span
            className="meeting_table_content_entity_info-project_color"
            id={name + "-" + id}
          ></span>
          {project}
        </p>
        <p className="meeting_table_content_entity_info">{name}</p>
        <p className="meeting_table_content_entity_info">{day}</p>
        <p className="meeting_table_content_entity_info">{hour}</p>
      </div>
    </Link>
  );
}

export default MeetingsTableDepPj;
