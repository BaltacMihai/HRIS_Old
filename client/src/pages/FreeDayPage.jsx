import Navbar from "../components/Navbar";
import React, { useEffect } from "react";
import useFreeDays from "../hooks/useFreeDays";
import formatDateForUser from "../utils/dates/formatDateForUser";
import deleteFreeDay from "../hooks/deleteFreeDay";

function FreeDayPage() {
  return (
    <div className="page meetings">
      <Navbar current="freeDay" />
      <div className="meetings_content">
        <FreeDayCalendar />
      </div>
    </div>
  );
}

function FreeDayCalendar() {
  let freeDaysRaw = useFreeDays();
  let freeDays = null;

  if (freeDaysRaw && freeDays == null) {
    freeDays = freeDaysRaw
      ?.map((event) => {
        return {
          eventAllocationId: event.id,
          username: event.User.username,
          userId: event.User.id,
          date: formatDateForUser(event.Event.startingDate),
          eventId: event.Event.id,
        };
      })
      .sort((a, b) => {
        if (a.eventAllocationId > b.eventAllocationId) return -1;
        else return 1;
      });
  } else {
    freeDays = [
      {
        username: "matei",
        date: "02.03.2020",
      },
    ];
  }

  return (
    <div className="freeDay_table">
      {returnTableHeader()}
      {returnTableContent(freeDays)}
    </div>
  );
}

function returnTableHeader() {
  return (
    <div className="freeDay_table_header">
      <p className="freeDay_table_header_item">Date</p>
      <p className="freeDay_table_header_item">Username</p>
      <p className="freeDay_table_header_item">Action</p>
    </div>
  );
}

function returnTableContent(event) {
  return (
    <div className="freeDay_table_content">
      {event.map((e) => {
        return (
          <Entity
            username={e.username}
            date={e.date}
            ids={{
              userId: e.userId,
              eventId: e.eventId,
              eventAllocationId: e.eventAllocationId,
            }}
          />
        );
      })}
    </div>
  );
}

function Entity({ username, date, ids }) {
  return (
    <div className="freeDay_table_content_entity">
      <p className="freeDay_table_content_entity_info">{date}</p>

      <p className="freeDay_table_content_entity_info">{username}</p>
      <p className="freeDay_table_content_entity_info">
        <span
          className="icon icon-bin2"
          onClick={(e) => {
            deleteFreeDay(ids.userId, ids.eventId, ids.eventAllocationId);
          }}
        ></span>
      </p>
    </div>
  );
}

export default FreeDayPage;
