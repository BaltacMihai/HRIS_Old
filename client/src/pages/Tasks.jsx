import React from "react";
import Navbar from "../components/Navbar";
import TasksTable from "../components/TasksTable";
import displayModal from "../utils/displayModal";
import { useParams } from "react-router-dom";
import TasksTableDepPj from "../components/TaskTableDepPj";
import useNavbarOption from "../utils/useNavbarOption";
import { CustomDateFormat } from "../utils/dates/CustomDateFormat";
import usePostData from "../hooks/usePostData";
import { EVENT_URL, PROJECT_ALLOCATION_URL } from "../routes";
import useData from "../hooks/useData";

function Tasks({ userId }) {
  let { projectId, departmentId } = useParams();
  let tableDetails;
  let events = null;

  let rawEvents = useData(PROJECT_ALLOCATION_URL.GET_BY_USER(userId));

  if (rawEvents && events == null) {
    events = rawEvents.map((e) => {
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
      events: events,
    };
  }
  useNavbarOption("tasks");

  return <div className="page tasks">{returnContent(tableDetails)}</div>;
}

function returnContent(tableDetails) {
  if (tableDetails.type == "User")
    return (
      <div className="tasks_content">
        {returnActions()}
        <TasksTable id={tableDetails.userId} />
        {returnAddTask(tableDetails)}
      </div>
    );
  else if (tableDetails.type == "Project") {
    return (
      <div className="meetings_content">
        {returnActions()}
        <TasksTableDepPj
          projectId={tableDetails.projectId}
          departmentId={tableDetails.departmentId}
        />
        {returnAddTask(tableDetails)}
      </div>
    );
  }
}
function displayStatusModal(location, type) {
  let statusModal = document.getElementById(location);

  statusModal.style.display = type;
}
function returnActions() {
  return (
    <div className="tasks_content_actions">
      {/* <div className="tasks_content_actions_filter">
        <div className="tasks_content_actions_filter_search">
          <input type="text" />
          <span className="icon-search icon"></span>
        </div>
        <p className="tasks_content_actions_filter_quick">Quick Filters</p>
      </div> */}
      <div
        className="tasks_content_actions_add"
        onClick={(e) => {
          displayModal("addTask", "flex");
        }}
      >
        <span className="icon-plus"></span>
      </div>
    </div>
  );
}

function returnAddTask(tableDetails) {
  if (tableDetails.type == "User")
    return (
      <div className="modal" id="addTask">
        <div className="modal_content">
          <span
            className="icon-cross close"
            onClick={(e) => {
              displayStatusModal("addTask", "none");
            }}
          ></span>

          <div className="title">Add Task</div>
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
            <label htmlFor="task_link">Label</label>
            <select name="task_link" id="task_link">
              <option value="New">New</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div className="modal_label">
            <label htmlFor="task_project">Project</label>
            <select name="task_project" id="task_project">
              {tableDetails.events?.map((e) => {
                return <option value={e.id}>{e.name}</option>;
              })}
            </select>
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
                displayStatusModal("addTask", "none");
              }}
            >
              Cancel
            </p>
            <p
              className="accept"
              onClick={(e) => {
                let generateEvent = {
                  userId: tableDetails.userId,
                  name: document.getElementById("task_name").value,
                  description:
                    document.getElementById("task_description").value,
                  label: document.getElementById("task_link").value,
                  projectId: document.getElementById("task_project").value,
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
                  type: "TASK",
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
  else if (tableDetails.type == "Project")
    return (
      <div className="modal" id="addTask">
        <div className="modal_content">
          <span
            className="icon-cross close"
            onClick={(e) => {
              displayStatusModal("addTask", "none");
            }}
          ></span>

          <div className="title">Add Task</div>
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
            <label htmlFor="task_link">Label</label>
            <select name="task_link" id="task_link">
              <option value="New">New</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
              <option value="Closed">Closed</option>
            </select>
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
                displayStatusModal("addTask", "none");
              }}
            >
              Cancel
            </p>
            <p
              className="accept"
              onClick={(e) => {
                let generateEvent = {
                  userId: tableDetails.userId,
                  name: document.getElementById("task_name").value,
                  description:
                    document.getElementById("task_description").value,
                  label: document.getElementById("task_link").value,
                  projectId: tableDetails.projectId,
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
                  type: "TASK",
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

export default Tasks;
