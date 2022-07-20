import React from "react";
import FreeDay from "../../hooks/postFreeDay";
import { CustomDateFormat } from "../../utils/dates/CustomDateFormat";
import displayModal from "../../utils/displayModal";

export function ContextCalendar({ id, number, xPos, yPos, refresh }) {
  return (
    <div
      className="context_menu"
      style={{ top: xPos, right: yPos }}
      id={"context_menu-" + number}
    >
      <div
        className="context_menu_item"
        onClick={(e) => {
          GetFreeDay(id, number, refresh);
        }}
      >
        <span className="icon-calendar"></span>
        <p>Take vacation</p>
      </div>
      <div
        className="context_menu_item"
        onClick={(e) => {
          displayModal("addMeeting", "flex");
        }}
      >
        <span className="icon-users"></span>

        <p>Add Meeting</p>
      </div>
      <div
        className="context_menu_item"
        onClick={(e) => {
          displayModal("addTask", "flex");
        }}
      >
        <span className="icon-briefcase"></span>
        <p>Add Task</p>
      </div>
    </div>
  );
}

export function removeContextCalendar(noOfDays) {
  for (let counter = 1; counter < noOfDays; counter++) {
    document
      .getElementById("context_menu-" + counter)
      .classList.remove("context_menu-active");

    document
      .getElementById("day-" + counter)
      .classList.remove("calendar_body_item-selected");
  }
}

async function GetFreeDay(id, date, refresh) {
  console.log(date);
  let currentDate = new Date();

  let newDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    date
  );

  let freeDay = await FreeDay(id, 0, new CustomDateFormat(newDate).database());

  window.location.reload();
}
