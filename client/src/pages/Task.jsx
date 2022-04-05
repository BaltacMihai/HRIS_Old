import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import useEvent from "../hooks/findEventsById";
import formatDateForUser from "../utils/dates/formatDateForUser";

function Task({ userId }) {
  let { taskId } = useParams();
  let data = useEvent("TASK", taskId);

  useEffect(() => {
    if (data) {
      let projectColor = document.getElementById(data.name + "-" + data.id);
      projectColor.style.backgroundColor = data.Project.color;
    }
  });

  if (data) {
    return (
      <div className="page task_page">
        <Navbar current="tasks" />
        {returnTaskContent(data)}
      </div>
    );
  } else
    return (
      <div className="page task_page">
        <Navbar current="tasks" />
        {returnLoading()}
      </div>
    );
}

function returnTaskContent(taskData) {
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
              Due date:{" "}
              <span>
                {formatDateForUser(taskData.endingDate)}
                {}
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
      {/* <div className="modal" id="seeMembers"></div> */}

      <div className="modal" id="changeStatus">
        <div className="modal_content">
          <span className="icon-cross close"></span>

          <div className="modal_label">
            <label for="status">
              <p>Select the status: </p>
            </label>

            <select name="status" id="status">
              <option value="new">New</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="modal_actions">
            <p className="cancel">Cancel</p>
            <p className="accept">Accept</p>
          </div>
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
