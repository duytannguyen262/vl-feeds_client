import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { IconButton, Tooltip } from "@mui/material";

import trashIcon from "../../../../assets/icons/trash.svg";
import userImg from "../../../../assets/user.png";
import ConfirmModal from "../../../ConfirmModal";

const Answers = ({ postId, isAnswersOpen, answers }) => {
  const [open, setOpen] = React.useState(false);
  const [answerId, setAnswerId] = React.useState(null);

  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      {isAnswersOpen &&
        answers.map((answer) => {
          const handleOpen = () => {
            setAnswerId(answer.id);
            setOpen(true);
          };

          return (
            <div key={answer.id} className="comment">
              <img
                src={
                  answer.author.avatar.url ? answer.author.avatar.url : userImg
                }
                alt=""
              />
              <div className="comment_info">
                <div className="comment_header">
                  <p className="username">{answer.author.username}</p>
                  <p className="date">{moment(answer.createdAt).fromNow()}</p>
                </div>
                <div className="comment_body">{answer.body}</div>
              </div>
              {user && user.username === answer.author.username && (
                <Tooltip title="Xóa câu trả lời" placement="right">
                  <IconButton
                    className="comment_trash"
                    aria-label="delete"
                    size="small"
                    onClick={() => handleOpen()}
                  >
                    <img src={trashIcon} alt="" />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          );
        })}
      <ConfirmModal
        open={open}
        setOpen={setOpen}
        objName="câu trả lời"
        postId={postId}
        answerId={answerId}
      />
    </div>
  );
};

export default Answers;
