import React, { useEffect } from "react";
import useTasks from "../../hooks/findTasksByIntervalAndUser";
import generateMonthDates from "../../utils/dates/generateMonthDates";
import TaskCard from "../TaskCard";
import formatDateForUser from "../../utils/dates/formatDateForUser";
import { CustomDateFormat } from "../../utils/dates/CustomDateFormat";

function MyTasks({ id }) {
  let currentDate = new Date();
  let event = useTasks(
    id,
    new CustomDateFormat(currentDate).database(),
    new CustomDateFormat(generateMonthDates().lastDay).database()
  );
  let events = null;

  if (event && events == null) {
    events = event.map((e) => {
      let date = new Date(e.Event.endingDate);

      return {
        id: e.eventId,
        name: e.Event.name,
        project: e.Event.Project.name,
        color: e.Event.Project.color,
        deadline: formatDateForUser(date),
      };
    });
  }

  if (events)
    return (
      <div className="widget myTask">
        <div className="myTask_header">
          <p className="myTask_header_title">My Tasks</p>
        </div>
        <div className="myTask_container">{mapTheTasks(events)}</div>
      </div>
    );
  //TODO: Loading animation + if array is empty to show empty state
  else
    return (
      <div className="widget myTask">
        <div className="myTask_header">
          <p className="myTask_header_title">My Tasks</p>
        </div>
      </div>
    );
}

function mapTheTasks(tasks) {
  return tasks.map((e) => {
    let today = formatDateForUser(new Date());

    if (e.deadline > today)
      return (
        <TaskCard
          name={e.name}
          project={e.project}
          deadline={e.deadline}
          id={e.id}
          color={e.color}
        />
      );
  });
}

export default MyTasks;
