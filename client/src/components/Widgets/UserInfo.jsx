import React from "react";

function UserInfo() {
  return (
    <div className="userInfo">
      <div className="userInfo_header">
        <p className="userInfo_header_title">Personal Info</p>
        <div className="userInfo_header_editBtn">
          <p>Edit Info</p>
        </div>
      </div>
      <div className="userInfo_container">
        <div className="userInfo_container_infos">
          <img
            className="userInfo_container_infos_photo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg"
          ></img>
          <h2 className="userInfo_container_infos_name">
            Baltac Mihai Cristian
          </h2>
        </div>
        <div className="userInfo_container_contact">
          <div className="userInfo_container_contact_item">
            <span className="icon-envelop"></span>
            <p>baltacmihaicristian@gmail.com</p>
          </div>
          <div className="userInfo_container_contact_item">
            <span className="icon-phone"></span>
            <p>0727121308</p>
          </div>
        </div>
      </div>
      <div className="userInfo_daysOf">
        <p>
          Days Off Left:
          <span className="userInfo_daysOf_data"> 23 </span>
          days
        </p>
      </div>
    </div>
  );
}

export default UserInfo;