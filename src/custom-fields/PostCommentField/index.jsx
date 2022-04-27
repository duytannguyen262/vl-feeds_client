import { TextareaAutosize } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import "./styles.scss";

const PostCommentField = (props) => {
  const { field } = props;
  const user = useSelector((state) => state.auth.user);
  //const { errors, touched } = form;
  //const showError = errors[name] && touched[name];
  return (
    <div className="post_comment_text-area">
      <TextareaAutosize
        style={{
          paddingRight: user.role === "teacher" ? "100px" : "50px",
        }}
        type="text"
        {...field}
        {...props}
      />
    </div>
  );
};

export default PostCommentField;
