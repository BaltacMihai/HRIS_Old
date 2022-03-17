import React from "react";

function TasksTable({ id }) {
  let tasks = [
    {
      project: "DTS",
      name: "Do to something very important",
      status: "Pending",
      beggining: "17/03/2022",
      ending: "19/03/2022",
    },
    {
      project: "DTS",
      name: "Do to something very important",
      status: "Pending",
      beggining: "17/03/2022",
      ending: "19/03/2022",
    },
    {
      project: "DTS",
      name: "Do to something very important",
      status: "Pending",
      beggining: "17/03/2022",
      ending: "19/03/2022",
    },
    {
      project: "DTS",
      name: "Do to something very important",
      status: "Pending",
      beggining: "17/03/2022",
      ending: "19/03/2022",
    },
    {
      project: "DTS",
      name: "Do to something very important",
      status: "Pending",
      beggining: "17/03/2022",
      ending: "19/03/2022",
    },
  ];

  return (
    <div className="task_table">
      {returnTableHeader()}
      {returnTableContent(tasks)}
    </div>
  );
}

function returnTableHeader() {
  return (
    <div className="task_table_header">
      <p className="task_table_header_item">Project</p>
      <p className="task_table_header_item">Task</p>
      <p className="task_table_header_item">Progress</p>
      <p className="task_table_header_item">Start task</p>
      <p className="task_table_header_item">Deadline</p>
      <p className="task_table_header_item">Actions</p>
    </div>
  );
}

function returnTableContent(tasks) {
  console.log(tasks);
  return (
    <div className="task_table_content">
      {tasks.map((e) => {
        return (
          <Entity
            project={e.project}
            name={e.name}
            status={e.status}
            beggining={e.beggining}
            ending={e.ending}
          />
        );
      })}
    </div>
  );
}

function Entity({ project, name, status, beggining, ending }) {
  return (
    <div className="task_table_content_entity">
      <p className="task_table_content_entity_info">{project}</p>
      <p className="task_table_content_entity_info">{name}</p>
      <p className="task_table_content_entity_info">{status}</p>
      <p className="task_table_content_entity_info">{beggining}</p>
      <p className="task_table_content_entity_info">{ending}</p>
      <p className="task_table_content_entity_info">...</p>
    </div>
  );
}
export default TasksTable;
