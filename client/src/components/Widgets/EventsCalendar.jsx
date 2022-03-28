import React, { useEffect, useState } from "react";
import compareDates from "../../utils/dates/compareDates";
import generateCurrentCalendarDates from "./Dates/generateCurrentCalendarDates";
import generateSpaces from "./Dates/generateSpacesCalendar";
import useEvents from "../../hooks/findEventsByIntervalAndUser";
import generateMonthDates from "../../utils/dates/generateMonthDates";
import formatDateForDatabase from "../../utils/dates/formatDateForDatabase";

function EventsCalendar({ id }) {
  const [refresh, setRefresh] = useState(null);

  let event = useEvents(
    id,
    formatDateForDatabase(generateMonthDates().firstDay),
    formatDateForDatabase(generateMonthDates().lastDay)
  );
  let events = null;
  if (refresh != null) event = null;

  if (event && events == null) {
    events = event.map((e) => {
      let date = new Date(e.Event.endingDate);

      return {
        name: "[" + e.Event.type + "] " + e.Event.name,
        color: e.Event.Project.color,
        date: date.getDate(),
      };
    });
  }

  useEffect(() => {
    if (events) {
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

        addEvent.title = addEvent.title + e.name + " - ";
      });
    }
  });

  return returnCalendarLayout(id, setRefresh);
}

function returnCalendarLayout(id, setRefresh) {
  return (
    <div className="widget events_calendar">
      <div className="events_calendar_header">
        <p className="events_calendar_header_title">Calendar</p>
      </div>
      <div className=" calendar">
        {returnCalendarHeader()}
        {returnCalendarBody(id, setRefresh)}
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

function returnCalendarBody(id, setRefresh) {
  let firstDay = generateMonthDates().firstDay;
  let lastDay = generateMonthDates().lastDay;
  return (
    <div className="calendar_body">
      {generateSpaces(firstDay.getDay())}
      {generateCurrentCalendarDates(id, setRefresh, lastDay.getDate() + 1)}
      {generateSpaces(lastDay.getDay())}
    </div>
  );
}

export default EventsCalendar;
