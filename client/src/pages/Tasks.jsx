import React from "react";
import Navbar from "../components/Navbar";
import TasksTable from "../components/TasksTable";

function Tasks({ userId }) {
  return (
    <div className="page tasks">
      <Navbar current="tasks" />
      {returnContent(userId)}
    </div>
  );
}

function returnContent(userId) {
  return (
    <div className="tasks_content">
      {returnActions()}
      <TasksTable id={userId} />
    </div>
  );
}

function returnActions() {
  return (
    <div className="tasks_content_actions">
      <div className="tasks_content_actions_filter">
        <div className="tasks_content_actions_filter_search">
          <input type="text" />
          <span className="icon-search icon"></span>
        </div>
        <p className="tasks_content_actions_filter_quick">Quick Filters</p>
      </div>
      <div className="tasks_content_actions_add">
        <span className="icon-plus"></span>
      </div>
    </div>
  );
}

export default Tasks;
