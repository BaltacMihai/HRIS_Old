import React from "react";
import TaskCard from "../TaskCard";

function MyTasks() {
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
    <div className="widget myTask">
      <div className="myTask_header">
        <p className="myTask_header_title">My Tasks</p>
      </div>
      <div className="myTask_container">{mapTheTasks(events)}</div>
    </div>
  );
}

function mapTheTasks(tasks) {
  return tasks.map((e) => (
    <TaskCard name={e.name} project={e.project} deadline={e.deadline} />
  ));
}

export default MyTasks;
