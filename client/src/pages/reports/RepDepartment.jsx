import React from "react";
import { Link, useParams } from "react-router-dom";
import { BarChart } from "../../components/Charts/BarCompare2Values";
import Navbar from "../../components/Navbar";
import deleteDepartment from "../../hooks/deleteDepartment";
import useDepartmentStats from "../../hooks/getDepartmentStats";
import putDepartment from "../../hooks/putDepartment";

function RepDepartments() {
  let { departmentId } = useParams();
  let departmentStats = useDepartmentStats(departmentId);

  if (departmentStats) {
    const URL_PEOPLE = "/reports/users/" + departmentStats.id;
    console.log(departmentStats);

    return (
      <div className="page report_page report_page-dep">
        <Navbar current="reports" />
        <div className="report_page_content">
          <div className="card row align-center space-between">
            <h1 className="title">
              {departmentStats.name} <span>department reports </span>
            </h1>
            <div className="actions">
              <span
                className="icon-pencil icon mr-25px"
                onClick={(e) => {
                  displayStatusModal("modifyDepartment", "flex");
                }}
              ></span>
              <span
                className="icon-bin2 icon "
                onClick={(e) => {
                  displayStatusModal("deleteDepartmentModal", "flex");
                }}
              ></span>
            </div>
          </div>
          <div className="actions">
            <Link to={URL_PEOPLE}>
              <button>See Members</button>
            </Link>
          </div>
          <div className="details">
            <div className="row">
              <div className="reports card">
                <h3>Task vs Meetings</h3>
                <BarChart
                  name="Task vs Meetings"
                  firstElement={{ name: "Tasks", value: departmentStats.Tasks }}
                  secondElement={{
                    name: "Meetings",
                    value: departmentStats.Meeting,
                  }}
                />
                <div className="details">
                  <h4>Summary:</h4>
                  <p>
                    Number of Tasks: <span>{departmentStats.Tasks}</span>
                  </p>
                  <p>
                    Number of Meetings: <span>{departmentStats.Meeting}</span>
                  </p>
                </div>
              </div>
              <div className="reports card">
                <h3>Projects vs Members</h3>
                <BarChart
                  name="Projects vs Members"
                  firstElement={{
                    name: "Projects",
                    value: departmentStats.noProjects,
                  }}
                  secondElement={{
                    name: "Members",
                    value: departmentStats.noUsers,
                  }}
                />
                <div className="details">
                  <h4>Summary:</h4>
                  <p>
                    Number of Projects:{" "}
                    <span>{departmentStats.noProjects}</span>
                  </p>
                  <p>
                    Number of Users: <span>{departmentStats.noUsers}</span>
                  </p>
                </div>
              </div>
            </div>
            {returnModifyDepartment(
              departmentStats.id,
              departmentStats.name,
              departmentStats.icon
            )}
            {returnDeleteModal(departmentStats.id)}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="page report_page">
        <Navbar current="reports" />
        <div className="report_page_content">
          <h1 className="title">Departments Reports</h1>
          <div className="details">
            <div className="reports"></div>
            <div className="list"></div>
          </div>
        </div>
      </div>
    );
  }
}

function returnModifyDepartment(id, name, icon) {
  return (
    <div className="modal" id="modifyDepartment">
      <div className="modal_content">
        <span
          className="icon-cross close"
          onClick={(e) => {
            displayStatusModal("modifyDepartment", "none");
          }}
        ></span>

        <div className="title">Modify Department</div>
        <div className="modal_label">
          <label htmlFor="department_name">Name</label>
          <input
            type="text"
            name="department_name"
            id="department_name"
            defaultValue={name}
          />
        </div>

        <div className="modal_label">
          <label htmlFor="department_icon">Icon</label>

          <input
            type="link"
            name="department_icon"
            id="department_icon"
            defaultValue={icon}
          />
        </div>

        <div className="modal_actions">
          <p
            className="cancel"
            onClick={(e) => {
              displayStatusModal("modifyDepartment", "none");
            }}
          >
            Cancel
          </p>
          <p
            className="accept"
            onClick={(e) => {
              const body = {
                id: id,
                name: document.getElementById("department_name").value,
                icon: document.getElementById("department_icon").value,
              };
              putDepartment(body);
            }}
          >
            Submit
          </p>
        </div>
      </div>
    </div>
  );
}
function returnDeleteModal(departmentId) {
  return (
    <div className="modal" id="deleteDepartmentModal">
      <div className="modal_content">
        <span
          className="icon-cross close"
          onClick={(e) => {
            displayStatusModal("deleteDepartmentModal", "none");
          }}
        ></span>
        <p className="title">
          {" "}
          Are you sure you want to delete this department?
        </p>
        <p className="text_body">This action is irreversible</p>

        <div className="modal_actions ">
          <p
            className="cancel"
            onClick={(e) => {
              displayStatusModal("deleteDepartmentModal", "none");
            }}
          >
            Cancel
          </p>
          <p
            className="accept"
            onClick={(e) => {
              deleteDepartment(departmentId);
            }}
          >
            Yes
          </p>
        </div>
      </div>
    </div>
  );
}
function displayStatusModal(location, type) {
  let statusModal = document.getElementById(location);

  statusModal.style.display = type;
}

export default RepDepartments;
