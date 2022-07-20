import React from "react";
import { Link } from "react-router-dom";
import { BarChart } from "../../components/Charts/BarDepartments";
import Navbar from "../../components/Navbar";
import useDepartmentsStats from "../../hooks/getDepartmentsStats";
import postDepartment from "../../hooks/postDepartment";
import Cookies from "universal-cookie";
import useNavbarOption from "../../utils/useNavbarOption";

function RepDepartments() {
  let departmentStats = useDepartmentsStats();

  const cookies = new Cookies();
  let user = cookies.get("user");
  useNavbarOption("reports");

  if (departmentStats)
    return (
      <div className="page report_page">
        <div className="report_page_content">
          <div className="card">
            <h1 className="title">Departments Reports</h1>
          </div>

          <div className="details">
            <div className="reports card">
              <h3>Comparison of Departments</h3>
              <BarChart date={departmentStats} />
            </div>
            <div className="list">
              <div className="row align-center space-between ">
                <p className="title">Departments: </p>
                {returnAddDepartmentButton(user.specialRights)}
              </div>
              <div className="departments">
                {returnDepartments(departmentStats)}
                {returnAddDepartment()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  else {
    return (
      <div className="page report_page">
        <div className="report_page_content">
          <h1 className="title">Departments Reports</h1>
          <div className="details">
            <div className="reports"></div>
            <div className="list"></div>
            {returnAddDepartment()}
          </div>
        </div>
      </div>
    );
  }
}

function returnAddDepartmentButton(role) {
  if (role === "SUPPORT")
    return (
      <span
        className="icon-plus icon"
        onClick={(e) => {
          displayStatusModal("addDepartment", "flex");
        }}
      ></span>
    );
}

function returnDepartments(details) {
  return details?.map((e) => {
    let link = "/reports/departments/" + e.id;
    return (
      <Link to={link}>
        <div className="department card">
          <img src={e.icon} alt="" />
          <p>{e.name}</p>
        </div>
      </Link>
    );
  });
}

function returnAddDepartment() {
  return (
    <div className="modal" id="addDepartment">
      <div className="modal_content">
        <span
          className="icon-cross close"
          onClick={(e) => {
            displayStatusModal("addDepartment", "none");
          }}
        ></span>

        <div className="title">Add Department</div>
        <div className="modal_label">
          <label htmlFor="department_name">Name</label>
          <input type="text" name="department_name" id="department_name" />
        </div>

        <div className="modal_label">
          <label htmlFor="department_icon">Icon</label>

          <input type="link" name="department_icon" id="department_icon" />
        </div>

        <div className="modal_actions">
          <p
            className="cancel"
            onClick={(e) => {
              displayStatusModal("addDepartment", "none");
            }}
          >
            Cancel
          </p>
          <p
            className="accept"
            onClick={(e) => {
              const body = {
                name: document.getElementById("department_name").value,
                icon: document.getElementById("department_icon").value,
              };
              postDepartment(body);
            }}
          >
            Submit
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
