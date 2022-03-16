import React from "react";
import useUsersProjects from "../../hooks/findUsersProjects";
import ProjectCard from "../ProjectCard";
import TaskCard from "../TaskCard";

function MyProjects({ id }) {
  let event = useUsersProjects(id);
  let events = null;

  if (event && events == null) {
    events = event.map((e) => {
      return {
        id: e.Project.id,
        name: e.Project.name,

        color: e.Project.color,
        role: e.type,
      };
    });
  }

  if (events)
    return (
      <div className="widget myProjects">
        <div className="myProjects_header">
          <p className="myProjects_header_title">My Projects</p>
        </div>
        <div className="myProjects_container">{mapTheTasks(events)}</div>
      </div>
    );
  else {
    return (
      <div className="widget myProjects">
        <div className="myProjects_header">
          <p className="myProjects_header_title">My Projects</p>
        </div>
      </div>
    );
  }
}

function mapTheTasks(tasks) {
  return tasks.map((e) => <ProjectCard name={e.name} role={e.role} />);
}

export default MyProjects;
