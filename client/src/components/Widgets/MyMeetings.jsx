import React from "react";
import useMeetings from "../../hooks/findMeetingsByIntervalAndUser";
import generateMonthDates from "../../utils/dates/generateMonthDates";
import MeetingsCard from "../MeetingsCard";
import formatDateForDatabase from "../../utils/dates/formatDateForDatabase";
import formatDateForUser from "../../utils/dates/formatDateForUser";
import formatHourForUser from "../../utils/dates/formatHourForUser";

function MyMeetings({ id }) {
  let currentDate = new Date();
  let event = useMeetings(
    id,
    formatDateForDatabase(currentDate),
    formatDateForDatabase(generateMonthDates().lastDay)
  );
  let events = null;

  if (event && events == null) {
    events = event.map((e) => {
      let date = new Date(e.Event.startingDate);

      return {
        id: e.eventId,
        name: e.Event.name,
        color: e.Event.Project.color,
        date: formatDateForUser(date),
        hour: formatHourForUser(date),
      };
    });
  }

  if (events)
    return (
      <div className="widget myMeeting">
        <div className="myMeeting_header">
          <p className="myMeeting_header_title">My Meetings</p>
        </div>
        <div className="myMeeting_container">{mapTheTasks(events)}</div>
      </div>
    );
  else {
    return (
      <div className="widget myMeeting">
        <div className="myMeeting_header">
          <p className="myMeeting_header_title">My Meetings</p>
        </div>
      </div>
    );
  }
}

function mapTheTasks(tasks) {
  //TODO: Filter the meetings
  return tasks.map((e) => {
    let today = formatDateForUser(new Date());

    if (e.date > today)
      return (
        <MeetingsCard
          name={e.name}
          date={e.date}
          hour={e.hour}
          id={e.id}
          color={e.color}
        />
      );
  });
}

export default MyMeetings;
