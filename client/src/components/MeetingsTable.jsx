import React, { useEffect } from "react";
import useMeetings from "../hooks/findMeetingsByIntervalAndUser";
import firstAndLastDayOfTheMonth from "../utils/firstAndLastDayOfTheMonth";
import generateDate from "../utils/generateDate";

function MeetingsTable({ id }) {
  let currentDate = new Date();
  let task = useMeetings(
    id,
    generateDate(currentDate),
    generateDate(firstAndLastDayOfTheMonth().lastDay)
  );
  let tasks = null;

  if (task && tasks == null) {
    tasks = task.map((e) => {
      let date = new Date(e.Event.endingDate);

      return {
        id: e.eventId,
        project: e.Event.Project.name,
        name: e.Event.name,
        color: e.Event.Project.color,
        day:
          date.getDate() +
          "." +
          (date.getMonth() + 1) +
          "." +
          date.getFullYear(),
        hour: date.getHours() + ":" + date.getMinutes(),
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

export default MeetingsTable;