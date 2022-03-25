import React from "react";
import getUserById from "../../hooks/User";

function UserInfo({ id }) {
  const userInfo = getUserById(id);
  console.log(userInfo);
  if (userInfo != undefined)
    if (userInfo.length > 0) return returnUserInfoCard(userInfo[0]);
    else return returnLoadingInfoCard();
  else return returnLoadingInfoCard();
}

function returnUserInfoCard(userInfo) {
  return (
    <div className="widget userInfo">
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
            src={
              userInfo.photo
                ? userInfo.photo
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg"
            }
          ></img>
          <h2 className="userInfo_container_infos_name">{userInfo.name}</h2>
        </div>
        <div className="userInfo_container_contact">
          <div className="userInfo_container_contact_item">
            <span className="icon-envelop"></span>
            <p>{userInfo.email}</p>
          </div>
          <div className="userInfo_container_contact_item">
            <span className="icon-phone"></span>
            <p>{userInfo.phone}</p>
          </div>
        </div>
      </div>
      <div className="userInfo_daysOf">
        <p>
          Days Off Left:
          <span className="userInfo_daysOf_data"> {userInfo.daysOff} </span>
          days
        </p>
      </div>
    </div>
  );
}

function returnLoadingInfoCard() {
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
          <h2 className="userInfo_container_infos_name userInfo_container_infos_name-loading"></h2>
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
