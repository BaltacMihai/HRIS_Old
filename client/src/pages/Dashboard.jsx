import React from "react";
import Navbar from "../components/Navbar";
import UserInfo from "../components/Widgets/UserInfo";
import EventsCalendar from "../components/Widgets/EventsCalendar";
import MyTasks from "../components/Widgets/MyTasks";
import MyMeetings from "../components/Widgets/MyMeetings";
import MyProjects from "../components/Widgets/MyProjects";
import formatDateForDatabase from "../utils/dates/formatDateForDatabase";

function Dashboard({ userId }) {
  return (
    <div className="page dashboard">
      <Navbar current="dashboard" />
      <div className="dashboard_content">
        <div className="row dashboard_content-row">
          <div className="col">
            <UserInfo id={userId} />
            <div className="row dashboard_content-row">
              <MyTasks id={userId} />
              <MyMeetings id={userId} />
            </div>
          </div>
          <div className="col">
            <EventsCalendar id={userId} />
            <MyProjects id={userId} />
          </div>
        </div>
      </div>
      {returnAddModal()}
      {returnAddTask()}
    </div>
  );
}

function displayStatusModal(location, type) {
  let statusModal = document.getElementById(location);

  statusModal.style.display = type;
}

function returnAddModal() {
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
            <option value="New">New</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
            <option value="Closed">Closed</option>
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
                title: document.getElementById("meeting_name").value,
                description: document.getElementById("meeting_description")
                  .value,
                label: document.getElementById("meeting_link").value,
                project: document.getElementById("meeting_project").value,
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
              };

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

function returnAddTask() {
  return (
    <div className="modal" id="addTask">
      <div className="modal_content">
        <span
          className="icon-cross close"
          onClick={(e) => {
            displayStatusModal("addTask", "none");
          }}
        ></span>
        <div className="members"></div>
        <div className="modal_actions">
          <p
            className="cancel"
            onClick={(e) => {
              displayStatusModal("addTask", "none");
            }}
          >
            Cancel
          </p>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
