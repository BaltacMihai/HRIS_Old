import React, { useEffect } from "react";
import firstAndLastDayOfTheMonth from "../../utils/firstAndLastDayOfTheMonth";
import compareDates from "../../utils/compareDates";
import generateCurrentCalendarDates from "../../utils/generateCurrentCalendarDates";
import generateSpaces from "../../utils/generateSpacesCalendar";
import useEvents from "../../hooks/findEventsByIntervalAndUser";
import generateDate from "../../utils/generateDate";

function EventsCalendar({ id }) {
  let event = useEvents(
    id,
    generateDate(firstAndLastDayOfTheMonth(0).firstDay),
    generateDate(firstAndLastDayOfTheMonth(0).lastDay)
  );
  let events = null;

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

  return returnCalendarLayout(id);
}

function returnCalendarLayout(id) {
  return (
    <div className="widget events_calendar">
      <div className="events_calendar_header">
        <p className="events_calendar_header_title">Calendar</p>
      </div>
      <div className=" calendar">
        {returnCalendarHeader()}
        {returnCalendarBody(id)}
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

function returnCalendarBody(id) {
  let firstDay = firstAndLastDayOfTheMonth(0).firstDay;
  let lastDay = firstAndLastDayOfTheMonth(0).lastDay;
  return (
    <div className="calendar_body">
      {generateSpaces(firstDay.getDay())}
      {generateCurrentCalendarDates(id, lastDay.getDate() + 1)}
      {generateSpaces(lastDay.getDay())}
    </div>
  );
}

export default EventsCalendar;
