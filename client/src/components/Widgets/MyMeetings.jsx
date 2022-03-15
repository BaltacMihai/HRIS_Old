import React from "react";
import TaskCard from "../TaskCard";

function MyMeetings() {
  let events = [
    {
      name: "Create the Dashbord Design",
      project: "Licenta Ase",
      deadline: "21.03.2022",
    },
    {
      name: "Create the Dashbord Design",
      project: "Licenta Ase",
      deadline: "21.03.2022",
    },
    {
      name: "Create the Dashbord Design",
      project: "Licenta Ase",
      deadline: "21.03.2022",
    },
    {
      name: "Create the Dashbord Design",
      project: "Licenta Ase",
      deadline: "21.03.2022",
    },
    {
      name: "Create the Dashbord Design",
      project: "Licenta Ase",
      deadline: "21.03.2022",
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
    <TaskCard name={e.name} project={e.project} deadline={e.deadline} />
  ));
}

export default MyMeetings;
