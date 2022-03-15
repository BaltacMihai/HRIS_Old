import React from "react";
import ProjectCard from "../ProjectCard";
import TaskCard from "../TaskCard";

function MyProjects() {
  let events = [
    {
      name: "Create the Dashbord Design",
      role: "Developer",
    },
    {
      name: "Create the Dashbord Design",
      role: "Developer",
    },
    {
      name: "Create the Dashbord Design",
      role: "Developer",
    },
    {
      name: "Create the Dashbord Design",
      role: "Developer",
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
  return tasks.map((e) => <ProjectCard name={e.name} role={e.role} />);
}

export default MyProjects;
