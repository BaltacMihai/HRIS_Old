import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import createUser from "../../hooks/createUser";
import useUsers from "../../hooks/getUsers";
import useDeparmtent from "../../hooks/useDepartment";

function RepUser() {
  let { departmentId } = useParams();
  let user = useUsers(departmentId);
  let departmentName = useDeparmtent(departmentId);

  if (user && departmentName) {
    if (departmentName.name == "FREE DAY") departmentName.name = "";

    return (
      <div className="page users">
        <Navbar current={"reports"} />
        {returnContent(user, departmentName)}
      </div>
    );
  } else {
    return (
      <div className="page projects">
        <Navbar current={"reports"} />
      </div>
    );
  }
}

function returnContent(user, departmentName) {
  return (
    <div className="project_content">
      {returnProjectsContent(user, departmentName)}
      {returnAddProject(user)}
    </div>
  );
}

function returnProjectsContent(user, departmentName) {
  let pageName = departmentName.name + " Users ";
  return (
    <div className="project_content_current">
      <div className="header">
        <h2>{pageName}</h2>
        <span
          className="icon-plus icon"
          onClick={(e) => {
            displayStatusModal("addUser", "flex");
          }}
        ></span>
      </div>
      <div className="project_content_current_projects">{mapUsers(user)}</div>
    </div>
  );
}

function mapUsers(user) {
  return user?.map((member) => {
    let specialRights =
      member.specialRights == "CEO"
        ? "CEO"
        : "" + member.specialRights == "SUPPORT"
        ? "SUPPORT"
        : "";
    specialRights = specialRights + " member_card_name";
    let link = "/user/" + member.id;
    return (
      <Link to={link}>
        <div className="member_card">
          <img
            className="member_card_photo"
            src={
              member.photo
                ? member.photo
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg"
            }
          ></img>

          <p className={specialRights}>{member.name}</p>
        </div>
      </Link>
    );
  });
}

function returnAddProject() {
  return (
    <div className="modal" id="addUser">
      <div className="modal_content">
        <span
          className="icon-cross close"
          onClick={(e) => {
            displayStatusModal("addUser", "none");
          }}
        ></span>

        <div className="title">Add User</div>
        <div className="modal_label">
          <label htmlFor="user_name">Name</label>
          <input type="text" name="user_name" id="user_name" />
        </div>
        <div className="modal_label">
          <label htmlFor="user_email">Email</label>
          <input type="email" name="user_email" id="user_email" />
        </div>
        <div className="modal_label">
          <label htmlFor="user_phone">Phone</label>
          <input type="phone" name="user_phone" id="user_phone" />
        </div>

        <div className="modal_label">
          <label htmlFor="user_photo">Photo</label>

          <input type="link" name="user_photo" id="user_photo" />
        </div>
        <div className="modal_label">
          <label htmlFor="user_daysOff">Free days:</label>

          <input type="number" name="user_daysOff" id="user_daysOff" />
        </div>
        <div className="modal_label">
          <label htmlFor="user_department">Department</label>

          <input type="text" name="user_department" id="user_department" />
        </div>
        <div className="modal_label">
          <label htmlFor="user_specialRights">Special Rights</label>

          <select name="user_specialRights" id="user_specialRights">
            <option value="EMPLOYEE">Employee</option>
            <option value="SUPPORT">Support</option>
            <option value="CEO">Ceo</option>
          </select>
        </div>

        <div className="modal_actions">
          <p
            className="cancel"
            onClick={(e) => {
              displayStatusModal("addUser", "none");
            }}
          >
            Cancel
          </p>
          <p
            className="accept"
            onClick={(e) => {
              let userInfo = {
                departmentId: document.getElementById("user_department").value,
                name: document.getElementById("user_name").value,
                email: document.getElementById("user_email").value,
                facebook: "none",
                photo: document.getElementById("user_photo").value,
                specialRights:
                  document.getElementById("user_specialRights").value,
                phone: document.getElementById("user_phone").value,
                daysOff: document.getElementById("user_daysOff").value,
              };

              createUser(userInfo);
              console.log(userInfo);
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
export default RepUser;
