import React, { useState, useEffect } from "react";
import user from "./user.png";
import "./custom.css";

import Editable from "./Editable";

const CustomInput = ({
  cancellor,
  parentId,
  value,
  edit,
  submit,
  handleCancel,
}) => {
  const [text, setText] = useState(value === undefined ? "" : value);

  useEffect(() => {
    console.log("console > ", value);
  });

  const handleChange = (e) => {
    console.log(e.target.value);
    setText(e.target.value);
  };
  return (
    <form>
      <div className="form">
        <div className="row">
          {" "}
          <img src={user} style={{ width: 80, height: 80 }} alt="user-img" />
          <div className="row">
            <div className="arrow-left"></div>
            <div className="input-div">
              <span className="input-name">Riya Negi</span>

              <Editable value={text} onChange={handleChange} />
            </div>
          </div>
        </div>
        <div className="btn-div">
          <button
            className="post-btn"
            onClick={() => submit(cancellor, text, parentId, edit, setText)}
            type="submit"
            disabled={!text}
          >
            Post
          </button>
          <button
            className="cancel-btn"
            onClick={() => handleCancel(cancellor, edit)}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default CustomInput;
