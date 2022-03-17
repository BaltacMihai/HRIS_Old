import React from "react";
import MeetingsTable from "../components/MeetingsTable";
import Navbar from "../components/Navbar";
import TasksTable from "../components/TasksTable";

function Meetings({ userId }) {
  return (
    <div className="page meetings">
      <Navbar current="meetings" />
      {returnContent(userId)}
    </div>
  );
}

function returnContent(userId) {
  return (
    <div className="meetings_content">
      {returnActions()}
      <MeetingsTable id={userId} />
    </div>
  );
}

function returnActions() {
  return (
    <div className="meetings_content_actions">
      <div className="meetings_content_actions_filter">
        <div className="meetings_content_actions_filter_search">
          <input type="text" />
          <span className="icon-search icon"></span>
        </div>
        <p className="meetings_content_actions_filter_quick">Quick Filters</p>
      </div>
      <div className="meetings_content_actions_add">
        <span className="icon-plus"></span>
      </div>
    </div>
  );
}

export default Meetings;
