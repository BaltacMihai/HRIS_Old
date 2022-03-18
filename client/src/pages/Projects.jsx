import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import useUsersProjects from "../hooks/findUsersProjects";

function Projects({ userId }) {
  let myProject = useUsersProjects(userId);
  let myProjects = null;

  if (myProject && myProjects == null) {
    myProjects = myProject.map((e) => {
      let endingDate = new Date(e.Project.endingDate);
      let startingDate = new Date(e.Project.startingDate);

      return {
        id: e.Project.id,
        name: e.Project.name,

        color: e.Project.color,
        role: e.type,
        startingDate:
          startingDate.getDate() +
          "." +
          (startingDate.getMonth() + 1) +
          "." +
          startingDate.getFullYear(),
        endingDate:
          endingDate.getDate() +
          "." +
          (endingDate.getMonth() + 1) +
          "." +
          endingDate.getFullYear(),
      };
    });
  }

  return (
    <div className="page projects">
      <Navbar current={"projects"} />
      {returnContent(myProjects)}
    </div>
  );
}
function returnContent(myProjects) {
  return (
    <div className="project_content">
      {returnActions()}
      {returnProjectsContent(myProjects)}
    </div>
  );
}
function returnActions() {
  return (
    <div className="project_content_actions">
      <div className="project_content_actions_filter">
        <div className="project_content_actions_filter_search">
          <input type="text" />
          <span className="icon-search icon"></span>
        </div>
        <p className="project_content_actions_filter_quick">Quick Filters</p>
      </div>
    </div>
  );
}

function returnProjectsContent(myProjects) {
  if (myProjects)
    return (
      <div className="project_content_current">
        <h2>Your Projects</h2>
        <div className="project_content_current_projects">
          {mapMyProjects(myProjects)}
        </div>
      </div>
    );
  else {
    return (
      <div className="project_content_current">
        <h2>Your Projects</h2>
        <div className="project_content_current_projects"></div>
      </div>
    );
  }
}

function mapMyProjects(myProjects) {
  return myProjects.map((e) => {
    return (
      <ProjectItem
        name={e.name}
        role={e.role}
        color={e.color}
        id={e.id}
        startingDate={e.startingDate}
        endingDate={e.endingDate}
      />
    );
  });
}

function ProjectItem({ name, role, color, id, startingDate, endingDate }) {
  useEffect(() => {
    let projectColor = document.getElementById(name + "-" + id);
    projectColor.style.backgroundColor = color;
  });
  return (
    <div className="project_item">
      <div className="project_item_color" id={name + "-" + id}></div>
      <p className="project_item_name">{name}</p>
      <p className="project_item_role">Role: {role}</p>
      <div className="project_item_dates">
        <div className="project_item_dates_date">{startingDate}</div>
        <div className="project_item_dates_date">{endingDate}</div>
      </div>
    </div>
  );
}
export default Projects;
