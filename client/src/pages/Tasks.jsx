import React from "react";
import Navbar from "../components/Navbar";
import TasksTable from "../components/TasksTable";
import formatDateForDatabase from "../utils/dates/formatDateForDatabase";
import submitNewMeeting from "../hooks/postEventAndAllocate";
import displayModal from "../utils/displayModal";

function Tasks({ userId }) {
  return (
    <div className="page tasks">
      <Navbar current="tasks" />
      {returnContent(userId)}
    </div>
  );
}

function returnContent(userId) {
  return (
    <div className="tasks_content">
      {returnActions()}
      <TasksTable id={userId} />
      {returnAddTask(userId)}
    </div>
  );
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

function returnAddTask(userId) {
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
            <option value="2">Dare To Speak</option>
            <option value="3">Academia Sperantei</option>
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

            <input type="date" name="task_ending_date" id="task_ending_date" />
          </div>
          <div className="modal_label">
            <label htmlFor="task_ending_hour">Ending Hour</label>

            <input type="time" name="task_ending_hour" id="task_ending_hour" />
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
                userId: userId,
                name: document.getElementById("task_name").value,
                description: document.getElementById("task_description").value,
                label: document.getElementById("task_link").value,
                projectId: document.getElementById("task_project").value,
                startingDate:
                  formatDateForDatabase(
                    document.getElementById("task_starting_date").value
                  ) +
                  " " +
                  document.getElementById("task_starting_hour").value,
                endingDate:
                  formatDateForDatabase(
                    document.getElementById("task_ending_date").value
                  ) +
                  " " +
                  document.getElementById("task_ending_hour").value,
                type: "TASK",
              };

              console.log(generateEvent);
              submitNewMeeting(generateEvent);
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
