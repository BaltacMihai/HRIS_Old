import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import useOtherProjects from "../hooks/findOtherProjects";
import useUsersProjects from "../hooks/findUsersProjects";
import formatDateForUser from "../utils/dates/formatDateForUser";

function Projects({ userId }) {
  let myProjects = GetMyProjects(userId);
  let otherProjects = GetOtherProjects(userId);

  return (
    <div className="page projects">
      <Navbar current={"projects"} />
      {returnContent(myProjects, otherProjects)}
    </div>
  );
}

function GetMyProjects(userId) {
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
        startingDate: formatDateForUser(startingDate),
        endingDate: formatDateForUser(endingDate),
      };
    });
  }

  return myProjects;
}

function GetOtherProjects(userId) {
  let myProject = useOtherProjects(userId);
  let myProjects = null;

  console.log(myProject);

  if (myProject && myProjects == null) {
    myProjects = myProject.map((e) => {
      let endingDate = new Date(e.endingDate);
      let startingDate = new Date(e.startingDate);

      return {
        id: e.id,
        name: e.name,

        color: e.color,
        role: "UnEnrolled",
        startingDate: formatDateForUser(startingDate),
        endingDate: formatDateForUser(endingDate),
      };
    });
    return myProjects;
  }
}

function returnContent(myProjects, otherProjects) {
  return (
    <div className="project_content">
      {/* {returnActions()} */}
      {returnProjectsContent(myProjects, otherProjects)}
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

function returnProjectsContent(myProjects, otherProjects) {
  if (myProjects && otherProjects)
    return (
      <div className="project_content_current">
        <h2>Your Projects</h2>
        <div className="project_content_current_projects">
          {mapMyProjects(myProjects)}
        </div>
        {/* <h2>Other Projects:</h2>
        <div className="project_content_current_projects">
          {mapMyProjects(otherProjects)}
        </div> */}
      </div>
    );
  else {
    return (
      <div className="project_content_current">
        <h2>Your Projects</h2>
        <div className="project_content_current_projects"></div>
        <h2>Other Projects:</h2>
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
