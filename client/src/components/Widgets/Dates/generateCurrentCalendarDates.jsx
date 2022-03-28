import { useState } from "react";
import useFreeDay from "../../../hooks/postFreeDay";
import {
  ContextCalendar,
  removeContextCalendar,
} from "../../ContextMenu/ContextCalendar";

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
              removeContextCalendar(noOfDays);

              let dashboard = document.getElementsByClassName("dashboard");

              dashboard[0].addEventListener("click", (e) => {
                removeContextCalendar(noOfDays);
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
          <ContextCalendar number={i} xPos={xPos} yPos={yPos} id={id} />
        </div>
      );
    }
  });
}
