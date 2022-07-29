import React from "react";
import MeetingsTable from "../components/MeetingsTable";
import displayModal from "../utils/displayModal";
import { useParams } from "react-router-dom";
import MeetingsTableDepPj from "../components/MeetingTableDepPj";
import useUsersProjects from "../hooks/findUsersProjects";
import useNavbarOption from "../utils/useNavbarOption";
import { CustomDateFormat } from "../utils/dates/CustomDateFormat";
import usePostData from "../hooks/usePostData";
import { EVENT_URL } from "../routes";

function Meetings({ userId }) {
  let { projectId, departmentId } = useParams();
  let tableDetails;

  let projects = null;
  let rawProjects = useUsersProjects(userId);

  if (rawProjects && projects == null) {
    projects = rawProjects.map((e) => {
      return {
        id: e.Project.id,
        name: e.Project.name,
      };
    });
  }

  if (projectId && departmentId) {
    tableDetails = {
      type: "Project",
      userId: userId,
      projectId: projectId,
      departmentId: departmentId,
    };
  } else {
    tableDetails = {
      type: "User",
      userId: userId,
      projects: projects,
    };
  }
  useNavbarOption("meetings");

  return <div className="page meetings">{returnContent(tableDetails)}</div>;
}

function returnContent(tableDetails) {
  if (tableDetails.type == "User")
    return (
      <div className="meetings_content">
        {returnActions()}
        <MeetingsTable id={tableDetails.userId} />
        {returnAddModal(tableDetails)}
      </div>
    );
  else if (tableDetails.type == "Project") {
    return (
      <div className="meetings_content">
        {returnActions()}
        <MeetingsTableDepPj
          projectId={tableDetails.projectId}
          departmentId={tableDetails.departmentId}
        />
        {returnAddModal(tableDetails)}
      </div>
    );
  }
}

function returnActions() {
  return (
    <div className="meetings_content_actions">
      {/* <div className="meetings_content_actions_filter">
        <div className="meetings_content_actions_filter_search">
          <input type="text" />
          <span className="icon-search icon"></span>
        </div>
        <p className="meetings_content_actions_filter_quick">Quick Filters</p>
      </div> */}
      <div
        className="meetings_content_actions_add"
        onClick={(e) => {
          displayModal("addMeeting", "flex");
        }}
      >
        <span className="icon-plus"></span>
      </div>
    </div>
  );
}
function displayStatusModal(location, type) {
  let statusModal = document.getElementById(location);

  statusModal.style.display = type;
}
function returnAddModal(tableDetails) {
  if (tableDetails.type == "User")
    return (
      <div className="modal" id="addMeeting">
        <div className="modal_content">
          <span
            className="icon-cross close"
            onClick={(e) => {
              displayStatusModal("addMeeting", "none");
            }}
          ></span>

          <div className="title">Add Meeting</div>
          <div className="modal_label">
            <label htmlFor="meeting_name">Name</label>
            <input type="text" name="meeting_name" id="meeting_name" />
          </div>
          <div className="modal_label">
            <label htmlFor="meeting_description">Description</label>
            <textarea
              name="meeting_description"
              id="meeting_description"
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <div className="modal_label">
            <label htmlFor="meeting_link">Link</label>
            <input type="text" name="meeting_link" id="meeting_link" />
          </div>
          <div className="modal_label">
            <label htmlFor="meeting_project">Project</label>
            <select name="meeting_project" id="meeting_project">
              {tableDetails.projects?.map((e) => {
                return <option value={e.id}>{e.name}</option>;
              })}
            </select>
          </div>

          <div className=" fieldset">
            <div className="modal_label">
              <label htmlFor="meeting_starting_date">Starting Date</label>

              <input
                type="date"
                name="meeting_starting_date"
                id="meeting_starting_date"
              />
            </div>
            <div className="modal_label">
              <label htmlFor="meeting_starting_hour">Starting Hour</label>

              <input
                type="time"
                name="meeting_starting_hour"
                id="meeting_starting_hour"
              />
            </div>
          </div>

          <div className=" fieldset">
            <div className="modal_label">
              <label htmlFor="meeting_ending_date">Ending Date</label>

              <input
                type="date"
                name="meeting_ending_date"
                id="meeting_ending_date"
              />
            </div>
            <div className="modal_label">
              <label htmlFor="meeting_ending_hour">Ending Hour</label>

              <input
                type="time"
                name="meeting_ending_hour"
                id="meeting_ending_hour"
              />
            </div>
          </div>
          <div className="modal_actions">
            <p
              className="cancel"
              onClick={(e) => {
                displayStatusModal("addMeeting", "none");
              }}
            >
              Cancel
            </p>
            <p
              className="accept"
              onClick={(e) => {
                let generateEvent = {
                  userId: tableDetails.userId,
                  name: document.getElementById("meeting_name").value,
                  description: document.getElementById("meeting_description")
                    .value,
                  label: document.getElementById("meeting_link").value,
                  projectId: document.getElementById("meeting_project").value,
                  startingDate:
                    new CustomDateFormat(
                      document.getElementById("meeting_starting_date").value
                    ).database() +
                    " " +
                    document.getElementById("meeting_starting_hour").value,
                  endingDate:
                    new CustomDateFormat(
                      document.getElementById("meeting_ending_date").value
                    ).database() +
                    " " +
                    document.getElementById("meeting_ending_hour").value,
                  type: "MEETING",
                };

                console.log(generateEvent);
                usePostData(EVENT_URL.POST_AND_ALLOCATE, generateEvent);
              }}
            >
              Submit
            </p>
          </div>
        </div>
      </div>
    );
  else if (tableDetails.type == "Project") {
    return (
      <div className="modal" id="addMeeting">
        <div className="modal_content">
          <span
            className="icon-cross close"
            onClick={(e) => {
              displayStatusModal("addMeeting", "none");
            }}
          ></span>

          <div className="title">Add Meeting</div>
          <div className="modal_label">
            <label htmlFor="meeting_name">Name</label>
            <input type="text" name="meeting_name" id="meeting_name" />
          </div>
          <div className="modal_label">
            <label htmlFor="meeting_description">Description</label>
            <textarea
              name="meeting_description"
              id="meeting_description"
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <div className="modal_label">
            <label htmlFor="meeting_link">Link</label>
            <input type="text" name="meeting_link" id="meeting_link" />
          </div>

          <div className=" fieldset">
            <div className="modal_label">
              <label htmlFor="meeting_starting_date">Starting Date</label>

              <input
                type="date"
                name="meeting_starting_date"
                id="meeting_starting_date"
              />
            </div>
            <div className="modal_label">
              <label htmlFor="meeting_starting_hour">Starting Hour</label>

              <input
                type="time"
                name="meeting_starting_hour"
                id="meeting_starting_hour"
              />
            </div>
          </div>

          <div className=" fieldset">
            <div className="modal_label">
              <label htmlFor="meeting_ending_date">Ending Date</label>

              <input
                type="date"
                name="meeting_ending_date"
                id="meeting_ending_date"
              />
            </div>
            <div className="modal_label">
              <label htmlFor="meeting_ending_hour">Ending Hour</label>

              <input
                type="time"
                name="meeting_ending_hour"
                id="meeting_ending_hour"
              />
            </div>
          </div>
          <div className="modal_actions">
            <p
              className="cancel"
              onClick={(e) => {
                displayStatusModal("addMeeting", "none");
              }}
            >
              Cancel
            </p>
            <p
              className="accept"
              onClick={(e) => {
                let generateEvent = {
                  userId: tableDetails.userId,
                  name: document.getElementById("meeting_name").value,
                  description: document.getElementById("meeting_description")
                    .value,
                  label: document.getElementById("meeting_link").value,
                  projectId: tableDetails.projectId,
                  startingDate:
                    new CustomDateFormat(
                      document.getElementById("meeting_starting_date").value
                    ).database() +
                    " " +
                    document.getElementById("meeting_starting_hour").value,
                  endingDate:
                    new CustomDateFormat(
                      document.getElementById("meeting_ending_date").value
                    ).database() +
                    " " +
                    document.getElementById("meeting_ending_hour").value,
                  type: "MEETING",
                  departmentId: tableDetails.departmentId,
                };

                console.log(generateEvent);
                usePostData(EVENT_URL.POST_AND_ALLOCATE, generateEvent);
              }}
            >
              Submit
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Meetings;
