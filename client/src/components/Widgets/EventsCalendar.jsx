import React, { useEffect } from "react";
import firstAndLastDayOfTheMonth from "../../utils/firstAndLastDayOfTheMonth";
import compareDates from "../../utils/compareDates";
import generateCurrentCalendarDates from "../../utils/generateCurrentCalendarDates";
import generateSpaces from "../../utils/generateSpacesCalendar";

function EventsCalendar() {
  let events = [
    { name: "Create The Navbars", color: "#FFC400", date: "12" },
    { name: "Meeting With the board", color: "#72A1E5", date: "14" },
    { name: "PoC To Be Done", color: "#72A1E5", date: "11" },
    { name: "Create something", color: "#72A1E5", date: "21" },
    { name: "Create New", color: "#FFC400", date: "21" },
    { name: "Solution New", color: "#FFC400", date: "21" },
    { name: "Solution New", color: "#FFC400", date: "29" },
  ];

  useEffect(() => {
    console.log(events);

    events.sort(compareDates);
    let currentDate = new Date();
    let date = document.getElementById("day-" + currentDate.getDate());
    date.classList.add("calendar_body_item-today");

    events.forEach((e) => {
      let addEvent = document.getElementById("day-" + e.date);

      addEvent.classList.replace(
        "calendar_body_item-event",
        "calendar_body_item-event-more"
      );

      addEvent.classList.add("calendar_body_item-event");
      addEvent.style.backgroundColor = e.color;

      addEvent.title = addEvent.title + " - " + e.name;
    });
  });

  return returnCalendarLayout();
}

function returnCalendarLayout() {
  return (
    <div className="widget events_calendar">
      <div className="events_calendar_header">
        <p className="events_calendar_header_title">Calendar</p>
      </div>
      <div className=" calendar">
        {returnCalendarHeader()}
        {returnCalendarBody()}
      </div>
    </div>
  );
}

function returnCalendarHeader() {
  return (
    <div className="calendar_header">
      <div className="calendar_header_item">M</div>
      <div className="calendar_header_item">T</div>
      <div className="calendar_header_item">W</div>
      <div className="calendar_header_item">T</div>
      <div className="calendar_header_item">F</div>
      <div className="calendar_header_item">S</div>
      <div className="calendar_header_item">S</div>
    </div>
  );
}

function returnCalendarBody() {
  let firstDay = firstAndLastDayOfTheMonth(0).firstDay;
  let lastDay = firstAndLastDayOfTheMonth(0).lastDay;

  return (
    <div className="calendar_body">
      {generateSpaces(firstDay.getDay())}
      {generateCurrentCalendarDates(lastDay.getDate() + 1)}
      {generateSpaces(lastDay.getDay())}
    </div>
  );
}

export default EventsCalendar;
