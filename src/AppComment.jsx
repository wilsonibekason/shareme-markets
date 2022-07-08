import "./styles.css";

import React, { useState, useEffect } from "react";
import data from "./data.json";

import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";

import CustomInputt from "./CustomInputt";
import Editable from "./Editable";

const App = () => {
  const [comment, setComment] = useState(data);
  const user =
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80";
  const userId = "01a"; 
  const avatarUrl = "https://ui-avatars.com/api/name=Riya&background=random";
  const name = "xyz";
  const signinUrl = "/signin";
  const signupUrl = "/signup";
  let count = 0;
  comment.map((i) => {
    return  count += 1;
    i.replies && i.replies.map((i) => (count += 1));
  });

  const [textEditable, setTextEditable] = useState("");

  useEffect(() => {
    console.log(comment);
  }, [comment]);

  const customInputFunc = (props) => {
    return (
      <CustomInputt
        parentId={props.parentId}
        cancellor={props.cancellor}
        value={props.value}
        edit={props.edit}
        submit={props.submit}
        handleCancel={props.handleCancel}
      />
    );
  };

  const editable = (props) => {
    return (
      <Editable
        value={textEditable}
        onChange={(evt) => {
          setTextEditable(evt.target.value);
        }}
        onCancel={(evt) => {
          setTextEditable("");
        }}
        onPost={(evt) => {
          console.log("onPost >", textEditable);
        }}
      />
    );
  };

  return (
    <div className="cols">
      <div className="commentSection">
        <div className="header">
          {" "}
          Custom Input Field component (user logged in) 
        </div>
        <CommentSection
          currentUser={
            userId && { userId: userId, avatarUrl: avatarUrl, name: name }
          }
          commentsArray={comment}
          setComment={setComment}
          signinUrl={signinUrl}
          signupUrl={signupUrl}
          customInput={customInputFunc}
        />
      </div>
    </div>
  );
};

export default App;
