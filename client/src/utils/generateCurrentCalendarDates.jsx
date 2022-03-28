import { useState } from "react";
import useFreeDay from "../hooks/postFreeDay";

export default function GenerateCurrentCalendarDates(id, noOfDays) {
  let xPos;
  let yPos;
  return [...Array(noOfDays)].map((e, i) => {
    if (i > 0) {
      return (
        <div className="calendar_body_item">
          <abbr
            id={"day-" + i}
            key={"day-" + i}
            onClick={(e) => {
              //TODO: Must find a better way to do this
              removeContextMenu(noOfDays);

              let dashboard = document.getElementsByClassName("dashboard");

              dashboard[0].addEventListener("click", (e) => {
                removeContextMenu(noOfDays);
              });

              document
                .getElementById("day-" + i)
                .classList.add("calendar_body_item-selected");

              document
                .getElementById("context_menu-" + i)
                .classList.add("context_menu-active");

              xPos = e.clientX + "px";
              yPos = e.clientY + "px";
            }}
          >
            {i}
          </abbr>
          <ContextMenu number={i} xPos={xPos} yPos={yPos} id={id} />
        </div>
      );
    }
  });
}

function removeContextMenu(noOfDays) {
  for (let counter = 1; counter < noOfDays; counter++) {
    document
      .getElementById("context_menu-" + counter)
      .classList.remove("context_menu-active");

    document
      .getElementById("day-" + counter)
      .classList.remove("calendar_body_item-selected");
  }
}

function ContextMenu({ id, number, xPos, yPos }) {
  //useFreeDay(1, "22-03-2022");
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
