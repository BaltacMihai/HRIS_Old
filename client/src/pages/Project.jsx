import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import useProject from "../hooks/useProject";
import useProjectDepartments from "../hooks/useProjectDepartments";
import formatDateForUser from "../utils/dates/formatDateForUser";

function Project({ userId }) {
  let { projectId } = useParams();
  console.log(projectId);

  let rawProjectInfo = useProject(projectId);
  let rawProjectDepartments = useProjectDepartments(projectId);
  console.log(rawProjectDepartments);

  let projectInfo = null;
  let departments = null;

  if (rawProjectInfo && projectInfo == null) {
    projectInfo = {
      title: rawProjectInfo.name,
      description: rawProjectInfo.description,
      color: rawProjectInfo.color,
      period:
        formatDateForUser(rawProjectInfo.startingDate) +
        " - " +
        formatDateForUser(rawProjectInfo.endingDate),
      projectManag: rawProjectInfo.projectManag,
    };
  }
  if (rawProjectDepartments && departments == null) {
    departments = rawProjectDepartments?.map((e) => {
      return {
        id: e.User.Department.id,
        logo: e.User.Department.icon,
        name: e.User.Department.name,
        teamLead: e.User.name,
      };
    });
  }

  useEffect(() => {
    if (projectInfo) {
      let projectColor = document.getElementById("title");
      projectColor.style.backgroundColor = projectInfo.color;
    }
  });

  if (projectInfo && departments)
    return (
      <div className="page project_page">
        <Navbar current="projects" />
        {returnProjectPage(projectInfo, departments, projectId)}
      </div>
    );
  else {
    return (
      <div className="page project_page">
        <Navbar current="projects" />
      </div>
    );
  }
}

function returnProjectPage(projectInfo, departments, projectId) {
  return (
    <div className="project_page_content">
      {returnProjectStats(projectInfo)}
      {returnDepartaments(departments, projectId)}
    </div>
  );
}

function returnProjectStats(projectInfo) {
  return (
    <div className="card">
      <div className="card_title">
        <p id="title">{projectInfo.title}</p>
      </div>
      <p className="card_description">{projectInfo.description}.</p>
      <div className="row">
        <p className="card_item">
          Project Manager : <strong> {projectInfo.projectManag}</strong>
        </p>
        <p className="card_item">
          Period : <strong> {projectInfo.period}</strong>
        </p>
      </div>
    </div>
  );
}

function returnDepartaments(departments, projectId) {
  return (
    <div className="section">
      <p className="title">Departments</p>
      <div className="row">
        {departments?.map((e) => {
          return returnDepartment(e, projectId);
        })}
      </div>
    </div>
  );
}

function returnDepartment(department, projectId) {
  let location = "/project/" + projectId + "/department/" + department.id;

  return (
    <Link to={location}>
      <div className="department">
        <img
          src={department.logo}
          alt={department.name + " department logo"}
          className="department_logo"
        />
        <p className="department_name">{department.name}</p>
        <div className="department_teamLead">{department.teamLead}</div>
      </div>
    </Link>
  );
}

export default Project;
