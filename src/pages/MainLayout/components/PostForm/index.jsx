import React, { useState } from "react";
import { useSelector } from "react-redux";
import userImg from "../../../../assets/user.png";

import "./styles.scss";
import { Button, Modal } from "@mui/material";
import PostFormModal from "./PostFormModal";

const PostForm = () => {
  const user = useSelector((state) => state.auth.user);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="postForm">
      <div className="postForm-avatar">
        <img src={user.avatar ? user.avatar : userImg} alt="" />
      </div>
      <div className="postForm_btn-to-open-modal">
        <Button onClick={handleOpen}>
          <div>Bạn muốn góp ý như thế nào tới nhà trường?</div>
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <PostFormModal
            open={open}
            handleClose={handleClose}
            setOpen={setOpen}
          />
        </Modal>
      </div>
    </div>
  );
};

export default PostForm;
