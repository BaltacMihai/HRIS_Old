import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function Task({ userId }) {
  let { taskId } = useParams();
  return (
    <div className="page task_page">
      <Navbar current="tasks" />
      {returnTaskContent(taskId)}
    </div>
  );
}

function returnTaskContent(taskData) {
  return (
    <div className="task_page_content">
      <p className="task_title">Project Name will be here</p>

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
