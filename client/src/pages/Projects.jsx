import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useOtherProjects from "../hooks/findOtherProjects";
import formatDateForUser from "../utils/dates/formatDateForUser";
import Cookies from "universal-cookie";
import useNavbarOption from "../utils/useNavbarOption";
import { CustomDateFormat } from "../utils/dates/CustomDateFormat";
import usePostData from "../hooks/usePostData";
import { PROJECT_ALLOCATION_URL, PROJECT_URL } from "../routes";
import useData from "../hooks/useData";

function Projects({ userId }) {
  let myProjects = GetMyProjects(userId);
  let otherProjects = GetOtherProjects(userId);

  const cookies = new Cookies();
  let user = cookies.get("user");

  useNavbarOption("projects");

  return (
    <div className="page projects">
      {returnContent(myProjects, otherProjects, user)}
    </div>
  );
}

function GetMyProjects(userId) {
  let myProject = useData(PROJECT_ALLOCATION_URL.GET_BY_USER(userId));
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

  if (myProject && myProjects == null) {
    myProjects = myProject.map((e) => {
      let endingDate = new Date(e.endingDate);
      let startingDate = new Date(e.startingDate);

      return {
        id: e.id,
        name: e.name,

        color: e.color,
        role: "",
        startingDate: formatDateForUser(startingDate),
        endingDate: formatDateForUser(endingDate),
      };
    });
    return myProjects;
  }
}

function returnContent(myProjects, otherProjects, user) {
  return (
    <div className="project_content">
      {/* {returnActions()} */}
      {returnProjectsContent(myProjects, otherProjects, user.specialRights)}
      {returnAddProject(user)}
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

function returnProjectsContent(myProjects, otherProjects, role) {
  if (myProjects && otherProjects)
    if (role != "SUPPORT") {
      return (
        <div className="project_content_current">
          <div className="header">
            <h2>Your Projects</h2>
            {returnAditionallActions(role)}
          </div>
          <div className="project_content_current_projects">
            {mapMyProjects(myProjects)}
          </div>
          {/* <h2>Other Projects:</h2>
        <div className="project_content_current_projects">
          {mapMyProjects(otherProjects)}
        </div> */}
        </div>
      );
    } else {
      return (
        <div className="project_content_current">
          <div className="header">
            <h2>Projects:</h2>
            {returnAditionallActions(role)}
          </div>
          <div className="project_content_current_projects">
            {mapMyProjects(otherProjects)}
          </div>
        </div>
      );
    }
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

function returnAditionallActions(role) {
  console.log(role);
  if (role != "EMPLOYEE") {
    return (
      <span
        className="icon-plus icon"
        onClick={(e) => {
          displayStatusModal("addProject", "flex");
        }}
      ></span>
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
  let location = "/project/" + id;
  switch (role) {
    case "EMPLOYEE":
      role = "Employee";
      break;
    case "TEAM_LEAD":
      role = "Team Lead";
      break;
    case "PROJECT_MANAGER":
      role = "Project Manager";
      break;
    case "CEO":
      role = "CEO";
      break;
    default:
      break;
  }
  return (
    <Link to={location} className="project_item">
      <div className="project_item_color" id={name + "-" + id}></div>
      <p className="project_item_name">{name}</p>
      <p className="project_item_role">{role}</p>
      <div className="project_item_dates">
        <div className="project_item_dates_date">{startingDate}</div>
        <div className="project_item_dates_date">{endingDate}</div>
      </div>
    </Link>
  );
}

function returnAddProject(user) {
  let userId = user.id;

  if (user.specialRights != "EMPLOYEE")
    return (
      <div className="modal" id="addProject">
        <div className="modal_content">
          <span
            className="icon-cross close"
            onClick={(e) => {
              displayStatusModal("addProject", "none");
            }}
          ></span>

          <div className="title">Add Project</div>
          <div className="modal_label">
            <label htmlFor="task_name">Name</label>
            <input type="text" name="task_name" id="task_name" />
          </div>
          <div className="modal_label">
            <label htmlFor="task_description">Description</label>
            <textarea
              name="task_description"
              id="task_description"
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <div className="modal_label">
            <label htmlFor="project_color">Color</label>
            <input type="color" name="project_color" id="project_color" />
          </div>

          <div className=" fieldset">
            <div className="modal_label">
              <label htmlFor="task_starting_date">Starting Date</label>

              <input
                type="date"
                name="task_starting_date"
                id="task_starting_date"
              />
            </div>
            <div className="modal_label">
              <label htmlFor="task_starting_hour">Starting Hour</label>

              <input
                type="time"
                name="task_starting_hour"
                id="task_starting_hour"
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
              />
            </div>
            <div className="modal_label">
              <label htmlFor="task_ending_hour">Ending Hour</label>

              <input
                type="time"
                name="task_ending_hour"
                id="task_ending_hour"
              />
            </div>
          </div>
          <div className="modal_actions">
            <p
              className="cancel"
              onClick={(e) => {
                displayStatusModal("addProject", "none");
              }}
            >
              Cancel
            </p>
            <p
              className="accept"
              onClick={(e) => {
                let generateProject = {
                  userId: userId,
                  name: document.getElementById("task_name").value,
                  description:
                    document.getElementById("task_description").value,
                  color: document.getElementById("project_color").value,

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
                };
                usePostData(PROJECT_URL.POST, generateProject);
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
export default Projects;
