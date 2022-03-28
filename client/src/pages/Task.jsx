import React from "react";
import { useParams } from "react-router-dom";

function Task({ id }) {
  let { taskId } = useParams();
  return <div>Task {taskId}</div>;
}

export default Task;
