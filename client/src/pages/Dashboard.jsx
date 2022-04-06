import React from "react";
import Navbar from "../components/Navbar";
import UserInfo from "../components/Widgets/UserInfo";
import EventsCalendar from "../components/Widgets/EventsCalendar";
import MyTasks from "../components/Widgets/MyTasks";
import MyMeetings from "../components/Widgets/MyMeetings";
import MyProjects from "../components/Widgets/MyProjects";

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
        <div className="members"></div>
        <div className="modal_actions">
          <p
            className="cancel"
            onClick={(e) => {
              displayStatusModal("addMeeting", "none");
            }}
          >
            Cancel
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
