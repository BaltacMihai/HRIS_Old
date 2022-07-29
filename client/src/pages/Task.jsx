import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useParams } from "react-router-dom";
import formatDateForUser from "../utils/dates/formatDateForUser";
import formatHourForUser from "../utils/dates/formatHourForUser";
import formatDateForInput from "../utils/dates/formatDateForInput";
import useNavbarOption from "../utils/useNavbarOption";
import { CustomDateFormat } from "../utils/dates/CustomDateFormat";
import useModify from "../hooks/useModify";
import { EVENT_ALLOCATION_URL, EVENT_URL } from "../routes";
import usePostData from "../hooks/usePostData";
import useDelete from "../hooks/useDelete";
import useData from "../hooks/useData";

function Task({ userId }) {
  let { taskId } = useParams();
  let data = useData(EVENT_URL.GET_BY_TYPE_EVENT_ID("TASK", taskId));

  let members = useData(EVENT_ALLOCATION_URL.GET(taskId));

  useEffect(() => {
    if (data && members) {
      let projectColor = document.getElementById(data.name + "-" + data.id);
      projectColor.style.backgroundColor = data.Project.color;
    }
  });
  useNavbarOption("tasks");

  if (data && members) {
    return (
      <div className="page task_page">
        {returnMeetingContent(data, members)}
      </div>
    );
  } else return <div className="page task_page">{returnLoading()}</div>;
}

function returnMeetingContent(taskData, members) {
  return (
    <div className="task_page_content">
      <p className="task_title">{taskData.name}</p>
      <div className="task_content">
        <div className="left">
          <div className="task_infos">
            <p
              className="task_infos_project"
              id={taskData.name + "-" + taskData.id}
            >
              {taskData.Project.name}
            </p>
            <p className="task_infos_deadline">
              <span className="icon-calendar icon"></span> Due date:{" "}
              <span className="task_infos_deadline_info">
                {formatDateForUser(taskData.endingDate)}
              </span>
            </p>
          </div>

          <div className="task_description">
            <div className="task_description_label">
              <span className="icon-paragraph-left"></span>
              <p className="task_description_label_text">Description</p>
            </div>
            <div className="task_description_textarea">
              <textarea
                name="text-description"
                id="text-description"
                cols="30"
                rows="10"
                spellcheck="false"
                readOnly="yes"
                value={taskData.description}
              ></textarea>
            </div>
          </div>
          {
            //TODO: MExt phase create the comments
            /* <div className="task_comment">
            <div className="task_comment_label">
              <span className=" icon-list"></span>
              <p className="task_comment_label_text">Comments</p>
            </div>

            <div className="task_comment_data">
              <Comment
                photo={null}
                name={"Baltac Mihai-Cristian"}
                text={
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi itaque temporibus laborum repudiandae quasi quia! Totam voluptas itaque animi repellat omnis quis tempora dolorum debitis."
                }
              />
              <Comment
                photo={null}
                name={"Baltac Mihai-Cristian"}
                text={
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi itaque temporibus laborum repudiandae quasi quia! Totam voluptas itaque animi repellat omnis quis tempora dolorum debitis."
                }
              />
              <Comment
                photo={null}
                name={"Baltac Mihai-Cristian"}
                text={
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi itaque temporibus laborum repudiandae quasi quia! Totam voluptas itaque animi repellat omnis quis tempora dolorum debitis."
                }
              />
              <Comment
                photo={null}
                name={"Baltac Mihai-Cristian"}
                text={
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi itaque temporibus laborum repudiandae quasi quia! Totam voluptas itaque animi repellat omnis quis tempora dolorum debitis."
                }
              />
            </div>
          </div> */
          }
        </div>
        <div className="right">
          <div className="task_status">
            <p className="task_status_text">Status</p>
            <p className={"task_status_info " + taskData.label}>
              {" "}
              {taskData.label}
            </p>
          </div>
          <div className="task_actions">
            <p className="task_actions_text">More Actions</p>
            {
              //TODO: Options To see documents
              /* <div className="option">
              <span className="icon-files-empty"></span>
              <p>See Documents</p>
            </div> */
            }
            <div
              className="option"
              onClick={(e) => {
                displayStatusModal("modifyTask", "flex");
              }}
            >
              <span className="icon-pencil"></span>
              <p>Modify Task</p>
            </div>
            <div
              className="option"
              onClick={(e) => {
                displayStatusModal("seeMembers", "flex");
              }}
            >
              <span className="icon-users"></span>
              <p>See Members</p>
            </div>
            <div
              className="option"
              onClick={(e) => {
                displayStatusModal("changeStatus", "flex");
              }}
            >
              <span className="icon-price-tags"></span>
              <p>Change Status</p>
            </div>
            <div
              className="option"
              onClick={(e) => {
                displayStatusModal("seeDeleteModal", "flex");
              }}
            >
              <span className="icon-bin2"></span>
              <p>Delete Task</p>
            </div>
          </div>
        </div>
      </div>

      {console.log(taskData)}
      {returnStatusModal(taskData.id, taskData.label)}
      {returnMembersModal(taskData.id, members)}
      {returnDeleteModal(taskData.id)}
      {returnModifyTask(
        taskData.id,
        taskData.name,
        taskData.description,
        taskData.startingDate,
        taskData.endingDate
      )}
    </div>
  );
}
function returnModifyTask(
  eventId,
  title,
  description,
  startingDate,
  endingDate
) {
  let generatedStartingDate = {
    date: formatDateForInput(startingDate),
    hour: formatHourForUser(startingDate),
  };
  let generatedEndingDate = {
    date: formatDateForInput(endingDate),
    hour: formatHourForUser(endingDate),
  };

  return (
    <div className="modal" id="modifyTask">
      <div className="modal_content">
        <span
          className="icon-cross close"
          onClick={(e) => {
            displayStatusModal("modifyTask", "none");
          }}
        ></span>

        <div className="title">Modify Task</div>
        <div className="modal_label">
          <label htmlFor="task_name">Name</label>
          <input
            type="text"
            name="task_name"
            id="task_name"
            defaultValue={title}
          />
        </div>
        <div className="modal_label">
          <label htmlFor="task_description">Description</label>
          <textarea
            name="task_description"
            id="task_description"
            cols="30"
            rows="10"
            defaultValue={description}
          ></textarea>
        </div>

        <div className=" fieldset">
          <div className="modal_label">
            <label htmlFor="task_starting_date">Starting Date</label>

            <input
              type="date"
              name="task_starting_date"
              id="task_starting_date"
              defaultValue={generatedStartingDate.date}
            />
          </div>
          <div className="modal_label">
            <label htmlFor="task_starting_hour">Starting Hour</label>

            <input
              type="time"
              name="task_starting_hour"
              id="task_starting_hour"
              defaultValue={generatedStartingDate.hour}
            />
          </div>
        </div>

        <div className=" fieldset">
          <div className="modal_label">
            <label htmlFor="task_ending_date">Ending Date</label>

            <input
              type="date"
              name="task_ending_date"
              id="task_ending_date"
              defaultValue={generatedEndingDate.date}
            />
          </div>
          <div className="modal_label">
            <label htmlFor="task_ending_hour">Ending Hour</label>

            <input
              type="time"
              name="task_ending_hour"
              id="task_ending_hour"
              defaultValue={generatedEndingDate.hour}
            />
          </div>
        </div>
        <div className="modal_actions">
          <p
            className="cancel"
            onClick={(e) => {
              displayStatusModal("modifyTask", "none");
            }}
          >
            Cancel
          </p>
          <p
            className="accept"
            onClick={(e) => {
              let generateEvent = {
                name: document.getElementById("task_name").value,
                description: document.getElementById("task_description").value,

                startingDate:
                  new CustomDateFormat(
                    document.getElementById("task_starting_date").value
                  ).database() +
                  " " +
                  document.getElementById("task_starting_hour").value,
                endingDate:
                  new CustomDateFormat(
                    document.getElementById("task_ending_date").value
                  ).database() +
                  " " +
                  document.getElementById("task_ending_hour").value,
                id: eventId,
                type: "TASK",
                label: "New",
              };
              useModify(EVENT_URL.PUT, generateEvent);

              console.log(generateEvent);
            }}
          >
            Submit
          </p>
        </div>
      </div>
    </div>
  );
}

function returnStatusModal(projectId, defaultValue) {
  return (
    <div className="modal" id="changeStatus">
      <div className="modal_content">
        <span
          className="icon-cross close"
          onClick={(e) => {
            displayStatusModal("changeStatus", "none");
          }}
        ></span>

        <div className="modal_label">
          <label htmlFor="status">
            <p>Select the status: </p>
          </label>

          <select name="status" id="status">
            <option value="New">New</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div className="modal_actions">
          <p
            className="cancel"
            onClick={(e) => {
              displayStatusModal("changeStatus", "none");
            }}
          >
            Cancel
          </p>
          <p
            className="accept"
            onClick={(e) => {
              let select = document.getElementById("status");
              let option = select.options[select.selectedIndex];
              let body = {
                id: projectId,
                type: "TASK",
                label: option.value,
              };
              useModify(EVENT_URL.PUT_LABEL, body);
            }}
          >
            Accept
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

function returnMembersModal(eventId, members) {
  let generatedMembers = members.map((e) => {
    return {
      id: e.User.id,
      photo: e.User.photo
        ? e.User.photo
        : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg",
      name: e.User.name,
    };
  });

  return (
    <div className="modal" id="seeMembers">
      <div className="modal_content">
        <span
          className="icon-cross close"
          onClick={(e) => {
            displayStatusModal("seeMembers", "none");
          }}
        ></span>
        <div className="modal_label modal_label-icon">
          <input
            type="text"
            name="add_memeber"
            id="add_memeber"
            placeholder="Write username"
          />
          <span
            className="icon-plus icon"
            onClick={(e) => {
              let body = {
                username: document.getElementById("add_memeber").value,
                eventId: eventId,
              };
              usePostData(EVENT_ALLOCATION_URL.POST, body);
            }}
          ></span>
        </div>
        <div className="members">
          {generatedMembers.map((member) => {
            return (
              <div className="member">
                <div className="member_infos">
                  <img
                    src={member.photo}
                    alt={member.name + " photo"}
                    className="member_infos_photo"
                  />
                  <p className="member_infos_name">{member.name}</p>
                </div>

                <span
                  className="actions icon-cross"
                  onClick={(e) => {
                    useDelete(EVENT_ALLOCATION_URL.DELETE(eventId, member.id));
                  }}
                ></span>
              </div>
            );
          })}
        </div>
        <div className="modal_actions modal_actions-one">
          <p
            className="cancel"
            onClick={(e) => {
              displayStatusModal("seeMembers", "none");
            }}
          >
            Cancel
          </p>
        </div>
      </div>
    </div>
  );
}
function returnDeleteModal(eventId) {
  return (
    <div className="modal" id="seeDeleteModal">
      <div className="modal_content">
        <span
          className="icon-cross close"
          onClick={(e) => {
            displayStatusModal("seeDeleteModal", "none");
          }}
        ></span>
        <p className="title"> Are you sure you want to delete this task?</p>
        <p className="text_body">This action is irreversible</p>

        <div className="modal_actions ">
          <p
            className="cancel"
            onClick={(e) => {
              displayStatusModal("seeDeleteModal", "none");
            }}
          >
            Cancel
          </p>
          <p
            className="accept"
            onClick={(e) => {
              useDelete(EVENT_URL.DELETE(eventId));
            }}
          >
            Yes
          </p>
        </div>
      </div>
    </div>
  );
}

function returnLoading() {
  return (
    <div className="task_page_content">
      <p className="task_title">{}</p>

      <div className="task_content">
        <div className="left">
          <div className="task_infos">
            <p className="task_infos_project">Dare To Speak</p>
            <p className="task_infos_deadline">
              <span className="icon-link"></span>
              Due date: <span>23.03.2022</span>
            </p>
          </div>

          <div className="task_description">
            <div className="task_description_label">
              <span className="icon-paragraph-left"></span>
              <p className="task_description_label_text">Description</p>
            </div>
            <div className="task_description_textarea">
              <textarea
                name="text-description"
                id="text-description"
                cols="30"
                rows="10"
                spellcheck="false"
                readOnly="yes"
              >
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum
                ipsa facilis at culpa deleniti, voluptas nam obcaecati itaque?
                Explicabo possimus corrupti voluptatibus ipsa eveniet beatae
                consequatur facilis vel eligendi nesciunt!
              </textarea>
            </div>
          </div>
          {
            //TODO: MExt phase create the comments
            /* <div className="task_comment">
            <div className="task_comment_label">
              <span className=" icon-list"></span>
              <p className="task_comment_label_text">Comments</p>
            </div>

            <div className="task_comment_data">
              <Comment
                photo={null}
                name={"Baltac Mihai-Cristian"}
                text={
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi itaque temporibus laborum repudiandae quasi quia! Totam voluptas itaque animi repellat omnis quis tempora dolorum debitis."
                }
              />
              <Comment
                photo={null}
                name={"Baltac Mihai-Cristian"}
                text={
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi itaque temporibus laborum repudiandae quasi quia! Totam voluptas itaque animi repellat omnis quis tempora dolorum debitis."
                }
              />
              <Comment
                photo={null}
                name={"Baltac Mihai-Cristian"}
                text={
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi itaque temporibus laborum repudiandae quasi quia! Totam voluptas itaque animi repellat omnis quis tempora dolorum debitis."
                }
              />
              <Comment
                photo={null}
                name={"Baltac Mihai-Cristian"}
                text={
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi itaque temporibus laborum repudiandae quasi quia! Totam voluptas itaque animi repellat omnis quis tempora dolorum debitis."
                }
              />
            </div>
          </div> */
          }
        </div>
        <div className="right">
          <div className="task_status">
            <p className="task_status_text">Status</p>
            <p className="task_status_info">Active</p>
          </div>
          <div className="task_actions">
            <p className="task_actions_text">More Actions</p>
            {
              //TODO: Options To see documents
              /* <div className="option">
              <span className="icon-files-empty"></span>
              <p>See Documents</p>
            </div> */
            }
            <div className="option">
              <span className="icon-users"></span>
              <p>See Members</p>
            </div>
            <div className="option">
              <span className="icon-price-tags"></span>
              <p>Change Status</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Comment({ photo, name, text }) {
  return (
    <div className="comment">
      <div className="comment_header">
        <img
          className="comment_header_photo"
          src={
            photo
              ? photo
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg"
          }
        ></img>
        <div className="comment_header_name">{name}</div>
      </div>
      <textarea
        name="textArea"
        id=""
        cols="30"
        rows="10"
        spellcheck="false"
        className="comment-text"
      >
        {text}
      </textarea>
    </div>
  );
}

export default Task;
