import React from "react";
import Navbar from "../components/Navbar";
import UserInfo from "../components/Widgets/UserInfo";

function Dashboard({ userId }) {
  return (
    <div className="page dashboard">
      <Navbar current="dashboard" />
      <div className="dashboard_content">
        <div className="row">
          <div className="col">
            <UserInfo id={userId} />
            <div className="row">
              <div>My Tasks</div>
              <div>My Meetings</div>
            </div>
          </div>
          <div className="col">
            <div>Calendar</div>
            <div>My project</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
