import React from "react";
import Navbar from "../components/Navbar";

function Calendar({ userId }) {
  return (
    <div className="page calendar">
      <Navbar current="calendar" />
      {returnContent(userId)}
    </div>
  );
}

function returnContent(userId) {
  return <div className="calendar_content">{returnActions()}</div>;
}

function returnActions() {
  return (
    <div className="calendar_content_header">
      <p className="calendar_content_header_title">My Schedule</p>
      <div className="calendar_content_header_menu">
        <div className="calendar_content_header_menu_item calendar_content_header_menu_item-active">
          Month
        </div>
        <div className="calendar_content_header_menu_item">Week</div>
        <div className="calendar_content_header_menu_item">Day</div>
      </div>
    </div>
  );
}

export default Calendar;
