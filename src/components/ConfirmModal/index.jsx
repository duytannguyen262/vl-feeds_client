import { useMutation } from "@apollo/client";
import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
import gql from "graphql-tag";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const ConfirmModal = ({
  open,
  setOpen,
  objName,
  postId,
  commentId,
  answerId,
}) => {
  const handleClose = () => setOpen(false);

  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
    update() {
      handleClose();
    },
    variables: {
      postId,
      commentId,
    },
  });
  const [deleteAnswer] = useMutation(DELETE_ANSWER_MUTATION, {
    update() {
      handleClose();
    },
    variables: {
      answerId,
      postId,
    },
  });
  const handleDelete = () => {
    if (answerId) {
      deleteAnswer();
    } else {
      deleteComment();
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="modal-modal-description">
              Bạn chắc chắn muốn xóa {objName} này?
            </Typography>
            <div className="modal_btns mt-3 d-flex justify-content-end">
              <Button
                variant="contained"
                style={{
                  marginRight: "10px",
                  backgroundColor: "#ff4546",
                }}
                onClick={() => handleDelete()}
              >
                Xóa {objName}
              </Button>
              <Button variant="outlined" onClick={handleClose}>
                Hủy
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        createdAt
        body
        author {
          id
          username
          avatar
        }
      }
      commentCount
    }
  }
`;

const DELETE_ANSWER_MUTATION = gql`
  mutation deleteAnswer($postId: ID!, $answerId: ID!) {
    deleteAnswer(postId: $postId, answerId: $answerId) {
      id
      answers {
        id
        createdAt
        body
        author {
          username
          avatar
        }
      }
    }
  }
`;

export default ConfirmModal;
