import React from "react";
import Navbar from "../components/Navbar";

function Calendar() {
  return (
    <div className="page calendar">
      <Navbar current="calendar" />
      <p>Calendar</p>
    </div>
  );
}

export default Calendar;
