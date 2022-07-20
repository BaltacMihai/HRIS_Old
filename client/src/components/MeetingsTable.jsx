import React, { useEffect } from "react";
import useMeetings from "../hooks/findMeetingsByIntervalAndUser";
import generateMonthDates from "../utils/dates/generateMonthDates";
import formatDateForUser from "../utils/dates/formatDateForUser";
import formatHourForUser from "../utils/dates/formatHourForUser";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { CustomDateFormat } from "../utils/dates/CustomDateFormat";

function MeetingsTable({ id }) {
  const cookies = new Cookies();
  let user = cookies.get("user");

  let currentDate = new Date();
  let task = useMeetings(
    id,
    new CustomDateFormat(currentDate).database() - 1,
    new CustomDateFormat(generateMonthDates().lastDay).database(),
    user.specialRights
  );
  let tasks = null;

  if (task && tasks == null) {
    tasks = task.map((e) => {
      let date = new Date(e.Event.startingDate);

      return {
        id: e.eventId,
        project: e.Event.Project.name,
        name: e.Event.name,
        color: e.Event.Project.color,
        day: formatDateForUser(date),
        hour: formatHourForUser(date),
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

export default MeetingsTable;
