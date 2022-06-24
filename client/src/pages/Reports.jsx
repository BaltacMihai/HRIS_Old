import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Reports() {
  return (
    <div className="page reports">
      <Navbar current="reports" />
      <div className="reports_content">
        <div className="row">
          <Link to="/reports/departments">
            <div className="reports_content_element">
              <img
                src="https://img.icons8.com/external-flaticons-lineal-flat-icons/150/000000/external-department-university-flaticons-lineal-flat-icons.png"
                alt="DepartmentImage"
              />
              <p>Departments</p>
            </div>
          </Link>
          <Link to="/reports/users">
            <div className="reports_content_element">
              <img
                src="https://img.icons8.com/external-smashingstocks-mixed-smashing-stocks/150/000000/external-users-internet-of-things-smashingstocks-mixed-smashing-stocks.png"
                alt="Users Image"
              />

              <p>Users</p>
            </div>{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Reports;
