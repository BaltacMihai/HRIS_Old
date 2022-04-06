import React from "react";
import MeetingsTable from "../components/MeetingsTable";
import Navbar from "../components/Navbar";
import formatDateForDatabase from "../utils/dates/formatDateForDatabase";
import submitNewMeeting from "../hooks/postEventAndAllocate";
import displayModal from "../utils/displayModal";

function Meetings({ userId }) {
  return (
    <div className="page meetings">
      <Navbar current="meetings" />
      {returnContent(userId)}
    </div>
  );
}

function returnContent(userId) {
  return (
    <div className="meetings_content">
      {returnActions()}
      <MeetingsTable id={userId} />
      {returnAddModal(userId)}
    </div>
  );
}

function returnActions() {
  return (
    <div className="meetings_content_actions">
      <div className="meetings_content_actions_filter">
        <div className="meetings_content_actions_filter_search">
          <input type="text" />
          <span className="icon-search icon"></span>
        </div>
        <p className="meetings_content_actions_filter_quick">Quick Filters</p>
      </div>
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
function returnAddModal(userId) {
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
            <option value="2">Dare To Speak</option>
            <option value="3">Academia Sperantei</option>
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

export default Meetings;
