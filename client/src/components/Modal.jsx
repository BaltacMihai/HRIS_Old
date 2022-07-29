import displayStatusModal from "../utils/displayStatusModal";

function Modal({ id, title, text, inputs, acceptAction }) {
  return (
    <div className="modal" id={id}>
      <div className="modal_content">
        <span
          className="icon-cross close"
          onClick={(e) => {
            displayStatusModal(id, "none");
          }}
        ></span>
        <p className="title">{title}</p>
        <p className="text_body">{text}</p>
        {inputs?.map((input) => {
          if (input.type === "input")
            return (
              <div className="modal_label">
                <label htmlFor={input.id}>{input.label}</label>

                <input
                  type={input.inputType}
                  name={input.id}
                  id={input.id}
                  defaultValue={input.defaultValue}
                />
              </div>
            );
          else if (input.type === "textarea")
            return (
              <div className="modal_label">
                <label htmlFor={input.id}>{input.label}</label>

                <textarea
                  name={input.id}
                  id={input.id}
                  cols="30"
                  rows="10"
                  defaultValue={input.defaultValue}
                ></textarea>
              </div>
            );
        })}
      </div>
      <div className="modal_actions">
        <p
          className="cancel"
          onClick={(e) => {
            displayStatusModal(id, "none");
          }}
        >
          Cancel
        </p>
        <p
          className="accept"
          onClick={(e) => {
            acceptAction();
            return 0;
          }}
        >
          Submit
        </p>
      </div>
    </div>
  );
}

export default Modal;
