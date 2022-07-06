import React from "react";
import Navbar from "../components/Navbar";
import UserInfo from "../components/Widgets/UserInfo";
import EventsCalendar from "../components/Widgets/EventsCalendar";
import MyTasks from "../components/Widgets/MyTasks";
import MyMeetings from "../components/Widgets/MyMeetings";
import MyProjects from "../components/Widgets/MyProjects";
import { useParams } from "react-router-dom";
import ReportsAll from "../components/Widgets/ReportsAll";
import useUserReport from "../hooks/getUserReports";
import useUserLastReport from "../hooks/getUserLastReport";
import Raports from "../components/Widgets/Raports";
import displayModal from "../utils/displayModal";
import useDepartmentsStats from "../hooks/getDepartmentsStats";
import getUserById from "../hooks/User";
import putUser from "../hooks/putUser";
import deleteUser from "../hooks/deleteUser";
import resetPasswordUser from "../hooks/restPasswordUser";
import Cookies from "universal-cookie";

function User() {
  let { userId } = useParams();
  const userInfo = getUserById(userId);

  const cookies = new Cookies();
  let user = cookies.get("user");

  let departmentStats = useDepartmentsStats();
  let listOfDepartments;

  if (departmentStats) {
    listOfDepartments = departmentStats?.map((department) => {
      return {
        name: department.name,
        id: department.id,
      };
    });
  }
  if (departmentStats && userInfo)
    return (
      <div className="page dashboard user-raport">
        <Navbar current="reports" />
        <div className="dashboard_content">
          <div className="row dashboard_content-row">
            <div className="col">
              <UserInfo id={userId} raport={true} />
              <Raports userId={userId} />
            </div>
            <div className="col">
              <EventsCalendar id={userId} isEditable={false} />
              <MyProjects id={userId} text={"His Projects"} />
            </div>
          </div>
          {returnModals(
            listOfDepartments,
            userInfo,
            userId,
            user.specialRights
          )}
        </div>
      </div>
    );
  else {
    return (
      <div className="page dashboard user-raport">
        <Navbar current="reports" />
        <div className="dashboard_content">
          <div className="row dashboard_content-row">
            <div className="col">
              <UserInfo id={userId} raport={true} />
              <Raports userId={userId} />
            </div>
            <div className="col">
              <EventsCalendar id={userId} isEditable={false} />
              <MyProjects id={userId} text={"His Projects"} />
            </div>
          </div>
          {returnDeleteModal(userId)}
          {returnResetPassword(userId)}
        </div>
      </div>
    );
  }
}

function returnModals(listOfDepartments, userInfo, userId, role) {
  if (role === "SUPPORT") {
    return (
      <div>
        {returnDeleteModal(userId)}
        {returnModifyUser(listOfDepartments, userInfo[0])}
        {returnResetPassword(userId)}
      </div>
    );
  }
}

function returnModifyUser(listOfDepartments, userInfo) {
  console.log(userInfo);
  return (
    <div className="modal" id="modifyUser">
      <div className="modal_content">
        <span
          className="icon-cross close"
          onClick={(e) => {
            displayStatusModal("modifyUser", "none");
          }}
        ></span>

        <div className="title">Modify User</div>
        <div className="modal_label">
          <label htmlFor="user_name">Name</label>
          <input
            type="text"
            name="user_name"
            id="user_name"
            defaultValue={userInfo.name}
          />
        </div>
        <div className="modal_label">
          <label htmlFor="user_email">Email</label>
          <input
            type="email"
            name="user_email"
            id="user_email"
            defaultValue={userInfo.email}
          />
        </div>
        <div className="modal_label">
          <label htmlFor="user_phone">Phone</label>
          <input
            type="phone"
            name="user_phone"
            id="user_phone"
            defaultValue={userInfo.phone}
          />
        </div>

        <div className="modal_label">
          <label htmlFor="user_photo">Photo</label>

          <input
            type="link"
            name="user_photo"
            id="user_photo"
            defaultValue={userInfo.photo}
          />
        </div>
        <div className="modal_label">
          <label htmlFor="user_daysOff">Free days:</label>

          <input
            type="number"
            name="user_daysOff"
            id="user_daysOff"
            defaultValue={userInfo.daysOff}
          />
        </div>
        <div className="modal_label">
          <label htmlFor="user_department">Department</label>

          <select
            name="user_department"
            id="user_department"
            defaultValue={userInfo.departmentId}
          >
            {listOfDepartments?.map((dep) => {
              return <option value={dep.id}>{dep.name}</option>;
            })}
          </select>
        </div>
        <div className="modal_label">
          <label htmlFor="user_specialRights">Special Rights</label>

          <select
            name="user_specialRights"
            id="user_specialRights"
            defaultValue={userInfo.specialRights}
          >
            <option value="EMPLOYEE">Employee</option>
            <option value="SUPPORT">Support</option>
            <option value="CEO">Ceo</option>
          </select>
        </div>

        <div className="modal_actions">
          <p
            className="cancel"
            onClick={(e) => {
              displayStatusModal("modifyUser", "none");
            }}
          >
            Cancel
          </p>
          <p
            className="accept"
            onClick={(e) => {
              let userInfoModified = {
                id: userInfo.id,
                departmentId: document.getElementById("user_department").value,
                name: document.getElementById("user_name").value,
                email: document.getElementById("user_email").value,
                photo: document.getElementById("user_photo").value,
                specialRights:
                  document.getElementById("user_specialRights").value,
                phone: document.getElementById("user_phone").value,
                daysOff: document.getElementById("user_daysOff").value,
              };

              putUser(userInfoModified);
            }}
          >
            Submit
          </p>
        </div>
      </div>
    </div>
  );
}

function returnDeleteModal(userId) {
  return (
    <div className="modal" id="deleteUser">
      <div className="modal_content">
        <span
          className="icon-cross close"
          onClick={(e) => {
            displayStatusModal("deleteUser", "none");
          }}
        ></span>
        <p className="title"> Are you sure you want to delete this user?</p>
        <p className="text_body">This action is irreversible</p>

        <div className="modal_actions ">
          <p
            className="cancel"
            onClick={(e) => {
              displayStatusModal("deleteUser", "none");
            }}
          >
            Cancel
          </p>
          <p
            className="accept"
            onClick={(e) => {
              deleteUser(userId);
            }}
          >
            Yes
          </p>
        </div>
      </div>
    </div>
  );
}

function returnResetPassword(userId) {
  return (
    <div className="modal" id="resetPassword">
      <div className="modal_content">
        <span
          className="icon-cross close"
          onClick={(e) => {
            displayStatusModal("resetPassword", "none");
          }}
        ></span>
        <p className="title">
          {" "}
          Are you sure you want to reset the password for this user?
        </p>
        <p className="text_body">
          An email is generated if with the new password if the action is
          completed
        </p>

        <div className="modal_actions ">
          <p
            className="cancel"
            onClick={(e) => {
              displayStatusModal("resetPassword", "none");
            }}
          >
            Cancel
          </p>
          <p
            className="accept"
            onClick={(e) => {
              resetPasswordUser({ id: userId });
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

export default User;
