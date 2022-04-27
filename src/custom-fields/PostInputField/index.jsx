import { TextareaAutosize } from "@mui/material";
import React from "react";

const PostInputField = (props) => {
  const { field } = props;
  //const { name } = field;
  //const { errors, touched } = form;
  //const showError = errors[name] && touched[name];

  return (
    <div className="postForm_modal_text-area mb-3">
      <TextareaAutosize
        className={`form-control`}
        type="text"
        {...field}
        {...props}
        minRows={3}
      />
    </div>
  );
};

export default PostInputField;
