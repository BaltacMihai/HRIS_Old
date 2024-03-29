import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import deleteProject from "../hooks/deleteProject";
import formatDateForInput from "../utils/dates/formatDateForInput";
import formatDateForUser from "../utils/dates/formatDateForUser";
import formatHourForUser from "../utils/dates/formatHourForUser";
import Cookies from "universal-cookie";
import useNavbarOption from "../utils/useNavbarOption";
import { CustomDateFormat } from "../utils/dates/CustomDateFormat";
import useModify from "../hooks/useModify";
import { PROJECT_ALLOCATION_URL, PROJECT_URL } from "../routes";
import usePostData from "../hooks/usePostData";
import useData from "../hooks/useData";

function Project({ userId }) {
  let { projectId } = useParams();

  const cookies = new Cookies();
  let user = cookies.get("user");

  let rawProjectInfo = useData(PROJECT_URL.GET(projectId));
  let rawProjectDepartments = useData(PROJECT_URL.GET_DEPARTMENTS(projectId));
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
      startingDate: rawProjectInfo.startingDate,
      endingDate: rawProjectInfo.endingDate,
    };

    if (rawProjectInfo.projectManagId === user.id)
      user.specialRights = "PROJECT_MANAGER";

    console.log(user);
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
  useNavbarOption("projects");

  useEffect(() => {
    if (projectInfo) {
      let projectColor = document.getElementById("title");
      projectColor.style.backgroundColor = projectInfo.color;
    }
  });

  if (projectInfo && departments)
    return (
      <div className="page project_page">
        {returnProjectPage(
          projectInfo,
          departments,
          projectId,
          user.specialRights
        )}
        {returnModifyMeeting(projectInfo, projectId)}
        {returnDeparment(projectId)}
      </div>
    );
  else {
    return <div className="page project_page"></div>;
  }
}

function returnProjectPage(projectInfo, departments, projectId, userRole) {
  if (userRole === "CEO" || userRole === "SUPPORT")
    return (
      <div className="project_page_content">
        {returnProjectStats(projectInfo, userRole)}
        {returnDepartaments(departments, projectId, userRole)}
        {returnMembersModal(projectId)}
        {returnDeleteModal(projectId)}
      </div>
    );
  else if (userRole === "PROJECT_MANAGER") {
    return (
      <div className="project_page_content">
        {returnProjectStats(projectInfo, userRole)}
        {returnDepartaments(departments, projectId, userRole)}
        {returnMembersModal(projectId)}
      </div>
    );
  } else {
    return (
      <div className="project_page_content">
        {returnProjectStats(projectInfo, userRole)}
        {returnDepartaments(departments, projectId, userRole)}
      </div>
    );
  }
}

function returnProjectStats(projectInfo, role) {
  console.log(projectInfo);
  if (projectInfo.projectManag != "None")
    return (
      <div className="card">
        <div className="row">
          <div className="card_title">
            <p id="title">{projectInfo.title}</p>
          </div>
          {returnProjectFunctions(role)}
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
  else {
    return (
      <div className="card">
        <div className="card_title">
          <div className="row">
            <p id="title">{projectInfo.title}</p>

            <div className="icons">
              <span
                className="icon-pencil icon"
                onClick={(e) => {
                  displayStatusModal("modifyProject", "flex");
                }}
              ></span>
              <span
                className="icon-bin2 icon"
                onClick={(e) => {
                  displayStatusModal("deleteProject", "flex");
                }}
              ></span>
            </div>
          </div>
        </div>
        <p className="card_description">{projectInfo.description}.</p>
        <div className="row">
          <p className="card_item">
            <div
              className="button"
              onClick={(e) => {
                displayStatusModal("addProjectManager", "flex");
              }}
            >
              <span className="icon-plus icon"></span>
              <p>Add Project Manager</p>
            </div>
          </p>
          <p className="card_item">
            Period : <strong> {projectInfo.period}</strong>
          </p>
        </div>
      </div>
    );
  }
}

function returnProjectFunctions(role) {
  console.log(role);
  if (role === "CEO" || role === "SUPPORT")
    return (
      <div className="icons">
        <span
          className="icon-pencil icon"
          onClick={(e) => {
            displayStatusModal("modifyProject", "flex");
          }}
        ></span>
        <span
          className="icon-bin2 icon"
          onClick={(e) => {
            displayStatusModal("deleteProject", "flex");
          }}
        ></span>
      </div>
    );
  else if (role === "PROJECT_MANAGER") {
    return (
      <div className="icons">
        <span
          className="icon-pencil icon"
          onClick={(e) => {
            displayStatusModal("modifyProject", "flex");
          }}
        ></span>
      </div>
    );
  }
}

function returnModifyMeeting(projectInfo, projectId) {
  let generatedStartingDate = {
    date: formatDateForInput(projectInfo.startingDate),
    hour: formatHourForUser(projectInfo.startingDate),
  };
  let generatedEndingDate = {
    date: formatDateForInput(projectInfo.endingDate),
    hour: formatHourForUser(projectInfo.endingDate),
  };

  return (
    <div className="modal" id="modifyProject">
      <div className="modal_content">
        <span
          className="icon-cross close"
          onClick={(e) => {
            displayStatusModal("modifyProject", "none");
          }}
        ></span>

        <div className="title">Modify Project</div>
        <div className="modal_label">
          <label htmlFor="task_name">Name</label>
          <input
            type="text"
            name="task_name"
            id="task_name"
            defaultValue={projectInfo.title}
          />
        </div>
        <div className="modal_label">
          <label htmlFor="task_description">Description</label>
          <textarea
            name="task_description"
            id="task_description"
            cols="30"
            rows="10"
            defaultValue={projectInfo.description}
          ></textarea>
        </div>
        <div className="modal_label">
          <label htmlFor="meeting_link">Color: </label>
          <input
            type="color"
            name="meeting_link"
            id="meeting_link"
            defaultValue={projectInfo.color}
          />
        </div>
        <div className=" fieldset">
          <div className="modal_label">
            <label htmlFor="task_starting_date">Starting Date</label>

            <input
              type="date"
              name="task_starting_date"
              id="task_starting_date"
              defaultValue={generatedStartingDate.date}
            />
          </div>
          <div className="modal_label">
            <label htmlFor="task_starting_hour">Starting Hour</label>

            <input
              type="time"
              name="task_starting_hour"
              id="task_starting_hour"
              defaultValue={generatedStartingDate.hour}
            />
          </div>
        </div>

        <div className=" fieldset">
          <div className="modal_label">
            <label htmlFor="task_ending_date">Ending Date</label>

            <input
              type="date"
              name="task_ending_date"
              id="task_ending_date"
              defaultValue={generatedEndingDate.date}
            />
          </div>
          <div className="modal_label">
            <label htmlFor="task_ending_hour">Ending Hour</label>

            <input
              type="time"
              name="task_ending_hour"
              id="task_ending_hour"
              defaultValue={generatedEndingDate.hour}
            />
          </div>
        </div>
        <div className="modal_actions">
          <p
            className="cancel"
            onClick={(e) => {
              displayStatusModal("modifyProject", "none");
            }}
          >
            Cancel
          </p>
          <p
            className="accept"
            onClick={(e) => {
              let generateEvent = {
                name: document.getElementById("task_name").value,
                description: document.getElementById("task_description").value,

                startingDate:
                  new CustomDateFormat(
                    document.getElementById("task_starting_date").value
                  ).database() +
                  " " +
                  document.getElementById("task_starting_hour").value,
                endingDate:
                  new CustomDateFormat(
                    document.getElementById("task_ending_date").value
                  ).database() +
                  " " +
                  document.getElementById("task_ending_hour").value,
                id: projectId,
                color: document.getElementById("meeting_link").value,
              };
              useModify(PROJECT_URL.PUT, generateEvent);
              console.log(generateEvent);
            }}
          >
            Submit
          </p>
        </div>
      </div>
    </div>
  );
}

function displayStatusModal(location, type) {
  let statusModal = document.getElementById(location);

  statusModal.style.display = type;
}

function returnMembersModal(projectId) {
  return (
    <div className="modal" id="addProjectManager">
      <div className="modal_content">
        <span
          className="icon-cross close"
          onClick={(e) => {
            displayStatusModal("addProjectManager", "none");
          }}
        ></span>
        <div className="title">Add Project Manager</div>
        <div className="modal_label modal_label-icon">
          <input
            type="text"
            name="add_memeber"
            id="add_memeber"
            placeholder="Write username"
          />
          <span
            className="icon-plus icon"
            onClick={(e) => {
              let body = {
                username: document.getElementById("add_memeber").value,
                projectId: projectId,
                type: "PROJECT_MANAGER",
              };
              useModify(PROJECT_URL.PUT, body);
            }}
          ></span>
        </div>
        <div className="members"></div>
        <div className="modal_actions modal_actions-one">
          <p
            className="cancel"
            onClick={(e) => {
              displayStatusModal("addProjectManager", "none");
            }}
          >
            Cancel
          </p>
        </div>
      </div>
    </div>
  );
}
function returnDeleteModal(projectId) {
  return (
    <div className="modal" id="deleteProject">
      <div className="modal_content">
        <span
          className="icon-cross close"
          onClick={(e) => {
            displayStatusModal("deleteProject", "none");
          }}
        ></span>
        <div className="title">
          Are you sure you want to delete this project?
        </div>
        <p class="text_body">This action is irreversible</p>
        <div className="modal_actions">
          <p
            className="cancel"
            onClick={(e) => {
              displayStatusModal("deleteProject", "none");
            }}
          >
            Cancel
          </p>
          <p
            className="accept"
            onClick={(e) => {
              deleteProject(projectId);
            }}
          >
            Yes
          </p>
        </div>
      </div>
    </div>
  );
}

function returnDepartaments(departments, projectId, role) {
  return (
    <div className="section">
      <div className="row row-department">
        <p className="title">Departments</p>
        {returnDepartmentActions(role)}
      </div>
      <div className="row">
        {departments?.map((e) => {
          return returnDepartment(e, projectId);
        })}
      </div>
    </div>
  );
}

function returnDepartmentActions(role) {
  console.log(role);
  if (role != "EMPLOYEE")
    return (
      <span
        className="icon-plus icon js-pj"
        onClick={(e) => {
          displayStatusModal("addTeamLead", "flex");
        }}
      ></span>
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
function returnDeparment(projectId) {
  return (
    <div className="modal" id="addTeamLead">
      <div className="modal_content">
        <span
          className="icon-cross close"
          onClick={(e) => {
            displayStatusModal("addTeamLead", "none");
          }}
        ></span>
        <div className="title">Add Team lead</div>
        <div className="description">
          Adding a team lead, means you add a department in this project
        </div>
        <div className="modal_label modal_label-icon">
          <input
            type="text"
            name="add_teamLead"
            id="add_teamLead"
            placeholder="Write username"
          />
          <span
            className="icon-plus icon"
            onClick={(e) => {
              let body = {
                username: document.getElementById("add_teamLead").value,
                projectId: projectId,
                type: "TEAM_LEAD",
              };
              usePostData(PROJECT_ALLOCATION_URL.POST, body);
            }}
          ></span>
        </div>
        <div className="members"></div>
        <div className="modal_actions modal_actions-one">
          <p
            className="cancel"
            onClick={(e) => {
              displayStatusModal("addTeamLead", "none");
            }}
          >
            Cancel
          </p>
        </div>
      </div>
    </div>
  );
}
export default Project;
