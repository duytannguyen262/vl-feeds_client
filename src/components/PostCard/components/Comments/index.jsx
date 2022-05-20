import { useQuery } from "@apollo/client";
import { IconButton, Tooltip } from "@mui/material";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import trashIcon from "../../../../assets/icons/trash.svg";
import userImg from "../../../../assets/user.png";
import { FETCH_POST_COMMENTS } from "../../../../util/graphql";
import ConfirmModal from "../../../ConfirmModal";
import "./styles.scss";

const Comments = ({ isCommentsOpen, postId }) => {
  const [open, setOpen] = React.useState(false);
  const [commentId, setCommentId] = React.useState(null);
  const user = useSelector((state) => state.auth.user);
  const { data, loading } = useQuery(FETCH_POST_COMMENTS, {
    variables: {
      postId,
    },
    skip: !isCommentsOpen,
  });

  const loadMoreButton = () => {
    if (data && data.getPost.comments.length > 1) {
      return (
        <div className="loadMoreButton">
          <button>
            <span>Tải thêm bình luận...</span>
          </button>
        </div>
      );
    }
    return null;
  };

  const navigate = useNavigate();
  const comments = () => {
    if (isCommentsOpen && data !== undefined) {
      return data.getPost.comments.map((comment) => {
        const handleOpen = () => {
          setCommentId(comment.id);
          setOpen(true);
        };

        return (
          <div key={comment.id}>
            <div className="comment">
              <img
                src={
                  comment.author.avatar.url
                    ? comment.author.avatar.url
                    : userImg
                }
                alt=""
                onClick={() => navigate(`/user/${comment.author.id}`)}
              />
              <div className="comment_info">
                <div className="comment_header">
                  <p className="username">{comment.author.username}</p>
                  <p className="date">{moment(comment.createdAt).fromNow()}</p>
                </div>
                <div className="comment_body">{comment.body}</div>
                {user && user.username === comment.author.username && (
                  <Tooltip title="Xóa bình luận" placement="right">
                    <IconButton
                      className="comment_trash"
                      aria-label="delete"
                      size="small"
                      onClick={handleOpen}
                    >
                      <img src={trashIcon} alt="" />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
        );
      });
    }
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div style={{ padding: "0 20px" }}>
          {comments()}
          {loadMoreButton()}
        </div>
      )}
      <ConfirmModal
        open={open}
        setOpen={setOpen}
        objName="bình luận"
        postId={postId}
        commentId={commentId}
      />
    </>
  );
};

export default Comments;
