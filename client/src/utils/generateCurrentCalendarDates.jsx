import { useState } from "react";

export default function GenerateCurrentCalendarDates(noOfDays) {
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
              // let lastElement;
              // if (
              //   document.getElementsByClassName("context_menu-active")
              // )
              //   lastElement = document.getElementsByClassName(
              //     "context_menu-active"
              //   );

              // lastElement[0].classList.remove("context_menu-active");
              document
                .getElementById("context_menu-" + i)
                .classList.add("context_menu-active");

              xPos = e.clientX + "px";
              yPos = e.clientY + "px";
            }}
          >
            {i}
          </abbr>
          <ContextMenu number={i} xPos={xPos} yPos={yPos} />
        </div>
      );
    }
  });
}

function ContextMenu({ number, xPos, yPos }) {
  return (
    <div
      className="context_menu"
      style={{ top: xPos, left: yPos }}
      id={"context_menu-" + number}
    >
      <div className="context_menu_item">Add Meeting</div>
      <div className="context_menu_item">Add Task</div>
      <div className="context_menu_item">Take vacation</div>
    </div>
  );
}
