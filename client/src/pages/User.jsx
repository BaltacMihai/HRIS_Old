import React from "react";
import Navbar from "../components/Navbar";
import UserInfo from "../components/Widgets/UserInfo";
import EventsCalendar from "../components/Widgets/EventsCalendar";
import MyTasks from "../components/Widgets/MyTasks";
import MyMeetings from "../components/Widgets/MyMeetings";
import MyProjects from "../components/Widgets/MyProjects";
import { useParams } from "react-router-dom";
import ReportsAll from "../components/Widgets/ReportsAll";
import useUserReport from "../hooks/getUserReports";
import useUserLastReport from "../hooks/getUserLastReport";
import Raports from "../components/Widgets/Raports";

function User() {
  let { userId } = useParams();

  return (
    <div className="page dashboard user-raport">
      <Navbar current="reports" />
      <div className="dashboard_content">
        <div className="row dashboard_content-row">
          <div className="col">
            <UserInfo id={userId} />
            <Raports userId={userId} />
          </div>
          <div className="col">
            <EventsCalendar id={userId} isEditable={false} />
            <MyProjects id={userId} text={"His Projects"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
