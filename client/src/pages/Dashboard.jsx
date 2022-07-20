import React from "react";
import Navbar from "../components/Navbar";
import UserInfo from "../components/Widgets/UserInfo";
import EventsCalendar from "../components/Widgets/EventsCalendar";
import MyTasks from "../components/Widgets/MyTasks";
import MyMeetings from "../components/Widgets/MyMeetings";
import MyProjects from "../components/Widgets/MyProjects";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useNavbarOption from "../utils/useNavbarOption";

function Dashboard({ userId }) {
  let { searchedUser } = useParams();
  let page = "dashboard";

  if (searchedUser) {
    userId = searchedUser;
    page = "reports";
  }
  useNavbarOption(page);

  return (
    <div className="page dashboard">
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
            <MyProjects id={userId} text={"My Projects"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
