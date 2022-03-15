import React from "react";
import MeetingsCard from "../MeetingsCard";

function MyMeetings() {
  let events = [
    {
      name: "Create the Dashbord Design",
      date: "21.03.2022",
      hour: "12:00",
    },
    {
      name: "Create the Dashbord Design",
      date: "21.03.2022",
      hour: "12:00",
    },
    {
      name: "Create the Dashbord Design",
      date: "21.03.2022",
      hour: "12:00",
    },
    {
      name: "Create the Dashbord Design",
      date: "21.03.2022",
      hour: "12:00",
    },
    {
      name: "Create the Dashbord Design",
      date: "21.03.2022",
      hour: "12:00",
    },
    {
      name: "Create the Dashbord Design",
      date: "21.03.2022",
      hour: "12:00",
    },
  ];

  return (
    <div className="widget myMeeting">
      <div className="myMeeting_header">
        <p className="myMeeting_header_title">My Meetings</p>
      </div>
      <div className="myMeeting_container">{mapTheTasks(events)}</div>
    </div>
  );
}

function mapTheTasks(tasks) {
  return tasks.map((e) => (
    <MeetingsCard name={e.name} date={e.date} hour={e.hour} />
  ));
}

export default MyMeetings;
