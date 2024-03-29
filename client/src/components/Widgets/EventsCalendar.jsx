import React, { useEffect, useState } from "react";
import compareDates from "../../utils/dates/compareDates";
import generateCurrentCalendarDates from "./Dates/generateCurrentCalendarDates";
import generateSpaces from "./Dates/generateSpacesCalendar";
import generateMonthDates from "../../utils/dates/generateMonthDates";
import { CustomDateFormat } from "../../utils/dates/CustomDateFormat";
import useData from "../../hooks/useData";
import { EVENT_ALLOCATION_URL } from "../../routes";

function EventsCalendar({ id, isEditable = true }) {
  const [refresh, setRefresh] = useState(null);

  let event = useData(
    EVENT_ALLOCATION_URL.GET_BY_INTERVAL(
      id,
      new CustomDateFormat(generateMonthDates().firstDay).database(),
      new CustomDateFormat(generateMonthDates().lastDay).database()
    )
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

  return returnCalendarLayout(id, setRefresh, isEditable);
}

function returnCalendarLayout(id, setRefresh, isEditable) {
  return (
    <div className="widget events_calendar">
      <div className="events_calendar_header">
        <p className="events_calendar_header_title">Calendar</p>
      </div>
      <div className=" calendar">
        {returnCalendarHeader()}
        {returnCalendarBody(id, setRefresh, isEditable)}
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

function returnCalendarBody(id, setRefresh, isEditable) {
  let firstDay = generateMonthDates().firstDay;

  let lastDay = generateMonthDates().lastDay;

  return (
    <div className="calendar_body">
      {generateSpaces(firstDay.getDay())}
      {generateCurrentCalendarDates(
        id,
        setRefresh,
        lastDay.getDate() + 1,
        isEditable
      )}
      {generateSpaces(lastDay.getDay())}
    </div>
  );
}

export default EventsCalendar;
