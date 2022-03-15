import React from "react";
import TaskCard from "../TaskCard";

function MyProjects() {
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
    <div className="widget myProjects">
      <div className="myProjects_header">
        <p className="myProjects_header_title">My Projects</p>
      </div>
      <div className="myProjects_container">{mapTheTasks(events)}</div>
    </div>
  );
}

function mapTheTasks(tasks) {
  return tasks.map((e) => (
    <TaskCard name={e.name} project={e.project} deadline={e.deadline} />
  ));
}

export default MyProjects;
