import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import useProject from "../hooks/useProject";
import formatDateForUser from "../utils/dates/formatDateForUser";

function Project({ userId }) {
  let { projectId } = useParams();
  console.log(projectId);

  let rawProjectInfo = useProject(projectId);
  console.log(rawProjectInfo);
  let projectInfo = null;

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

  let departments = [
    {
      logo: "https://img.icons8.com/external-outline-juicy-fish/344/external-it-devops-outline-outline-juicy-fish.png",
      name: "IT",
      teamLead: "Baltac Mihai-Cristian",
    },
    {
      logo: "https://img.icons8.com/external-sbts2018-outline-sbts2018/344/external-design-design-thinking2-sbts2018-outline-sbts2018-1.png",
      name: "Design",
      teamLead: "Baltac Mihai-Cristian",
    },
    {
      logo: "https://img.icons8.com/external-justicon-lineal-justicon/344/external-marketing-marketing-and-growth-justicon-lineal-justicon.png",
      name: "Marketing",
      teamLead: "Baltac Mihai-Cristian",
    },
    {
      logo: "",
      name: "",
      teamLead: "",
    },
  ];

  useEffect(() => {
    if (projectInfo) {
      let projectColor = document.getElementById("title");
      projectColor.style.backgroundColor = projectInfo.color;
    }
  });

  if (projectInfo)
    return (
      <div className="page project_page">
        <Navbar current="projects" />
        {returnProjectPage(projectInfo, departments)}
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

function returnProjectPage(projectInfo, departments) {
  return (
    <div className="project_page_content">
      {returnProjectStats(projectInfo)}
      {returnDepartaments(departments)}
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

function returnDepartaments(departments) {
  return (
    <div className="section">
      <p className="title">Departments</p>
      <div className="row">
        {departments?.map((e) => {
          return returnDepartment(e);
        })}
      </div>
    </div>
  );
}

function returnDepartment(department) {
  return (
    <div className="department">
      <img
        src={department.logo}
        alt={department.name + " department logo"}
        className="department_logo"
      />
      <p className="department_name">{department.name}</p>
      <div className="department_teamLead">{department.teamLead}</div>
    </div>
  );
}

export default Project;