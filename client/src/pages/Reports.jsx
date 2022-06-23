import React from "react";
import Navbar from "../components/Navbar";

function Reports() {
  return (
    <div className="page reports">
      <Navbar current="reports" />
      <div className="reports_content">
        <div className="row">
          <div className="reports_content_element">
            <img
              src="https://img.icons8.com/external-flaticons-lineal-flat-icons/150/000000/external-department-university-flaticons-lineal-flat-icons.png"
              alt="DepartmentImage"
            />
            <p>Departments</p>
          </div>
          <div className="reports_content_element">
            <img
              src="https://img.icons8.com/external-smashingstocks-mixed-smashing-stocks/150/000000/external-users-internet-of-things-smashingstocks-mixed-smashing-stocks.png"
              alt="Users Image"
            />
            <p>Users</p>
          </div>
          <div className="reports_content_element">
            {" "}
            <img
              src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/150/000000/external-project-management-flatart-icons-outline-flatarticons.png"
              alt="Projects Image"
            />
            <p>Projects</p>
          </div>
        </div>

        <div className="row">
          <div className="reports_content_element">
            {" "}
            <img
              src="https://img.icons8.com/dotty/150/000000/meeting.png"
              alt="Meetings Image"
            />
            <p>Meetings</p>
          </div>
          <div className="reports_content_element">
            {" "}
            <img
              src="https://img.icons8.com/external-others-pike-picture/150/000000/external-Tasks-development-others-pike-picture-4.png"
              alt="Tasks Image"
            />
            <p>Tasks</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
