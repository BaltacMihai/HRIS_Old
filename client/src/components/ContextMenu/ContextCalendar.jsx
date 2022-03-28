import React from "react";

function ContextCalendar({ id, number, xPos, yPos }) {
  return (
    <div
      className="context_menu"
      style={{ top: xPos, right: yPos }}
      id={"context_menu-" + number}
    >
      <div className="context_menu_item" onClick={(e) => {}}>
        <span className="icon-calendar"></span>
        <p>Take vacation</p>
      </div>
      <div className="context_menu_item">
        <span className="icon-users"></span>

        <p>Add Meeting</p>
      </div>
      <div className="context_menu_item">
        <span className="icon-briefcase"></span>
        <p>Add Task</p>
      </div>
    </div>
  );
}

function removeContextCalendar(noOfDays) {
  for (let counter = 1; counter < noOfDays; counter++) {
    document
      .getElementById("context_menu-" + counter)
      .classList.remove("context_menu-active");

    document
      .getElementById("day-" + counter)
      .classList.remove("calendar_body_item-selected");
  }
}

export { ContextCalendar, removeContextCalendar };
