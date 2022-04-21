import React from "react";
import useUsersProjects from "../../hooks/findUsersProjects";
import formatDateForDatabase from "../../utils/dates/formatDateForDatabase";
import ProjectCard from "../ProjectCard";
import submitNewMeeting from "../../hooks/postEventAndAllocate";

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
        {returnAddModal(id, events)}
        {returnAddTask(id, events)}
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
  return tasks.map((e) => (
    <ProjectCard name={e.name} role={e.role} color={e.color} id={e.id} />
  ));
}
function displayStatusModal(location, type) {
  let statusModal = document.getElementById(location);

  statusModal.style.display = type;
}

function returnAddModal(userId, events) {
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
            {events.map((e) => {
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
                userId: userId,
                name: document.getElementById("meeting_name").value,
                description: document.getElementById("meeting_description")
                  .value,
                label: document.getElementById("meeting_link").value,
                projectId: document.getElementById("meeting_project").value,
                startingDate:
                  formatDateForDatabase(
                    document.getElementById("meeting_starting_date").value
                  ) +
                  " " +
                  document.getElementById("meeting_starting_hour").value,
                endingDate:
                  formatDateForDatabase(
                    document.getElementById("meeting_ending_date").value
                  ) +
                  " " +
                  document.getElementById("meeting_ending_hour").value,
                type: "MEETING",
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

function returnAddTask(userId, events) {
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
            {events.map((e) => {
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

export default MyProjects;
