import React, { useEffect } from "react";
import generateMonthDates from "../utils/dates/generateMonthDates";
import formatDateForDatabase from "../utils/dates/formatDateForDatabase";
import formatDateForUser from "../utils/dates/formatDateForUser";
import formatHourForUser from "../utils/dates/formatHourForUser";
import useEventDepPj from "../hooks/useEventDepPj";

function MeetingsTableDepPj({ projectId, departmentId }) {
  let task = useEventDepPj(projectId, departmentId, "MEETING");

  console.log(task);
  let tasks = null;

  if (task && tasks == null) {
    tasks = task.map((e) => {
      let date = new Date(e.startingDate);

      return {
        id: e.eventId,
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
      <p className="meeting_table_header_item">Actions</p>
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
  return (
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
      <p className="meeting_table_content_entity_info meeting_table_content_entity_info-actions">
        ...
      </p>
    </div>
  );
}

export default MeetingsTableDepPj;
