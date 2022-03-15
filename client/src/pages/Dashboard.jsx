import React from "react";
import Navbar from "../components/Navbar";
import UserInfo from "../components/Widgets/UserInfo";
import EventsCalendar from "../components/Widgets/EventsCalendar";

function Dashboard({ userId }) {
  return (
    <div className="page dashboard">
      <Navbar current="dashboard" />
      <div className="dashboard_content">
        <div className="row dashboard_content-row">
          <div className="col">
            <UserInfo id={userId} />
            <div className="row">
              <div>My Tasks</div>
              <div>My Meetings</div>
            </div>
          </div>
          <div className="col">
            <EventsCalendar id={userId} />
            <div>My project</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
