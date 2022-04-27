import { useMutation } from "@apollo/client";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  IconButton,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import gql from "graphql-tag";
import React from "react";
import trashIcon from "../../../../assets/icons/trash.svg";
import {
  FETCH_POSTS_PAGINATION,
  FETCH_POSTS_QUERY,
} from "../../../../util/graphql";

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

const DeletePost = ({ postId }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(proxy) {
      //remove deleted post from cache
      // const data = proxy.readQuery({
      //   query: FETCH_POSTS_PAGINATION,
      //   variables: {
      //     first: 2,
      //   },
      // });
      // proxy.writeQuery({
      //   query: FETCH_POSTS_PAGINATION,
      //   data: {
      //     posts: {
      //       edges: data.posts.edges.filter((post) => post.id !== postId),
      //     },
      //   },
      // });
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });

      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: data.getPosts.filter((post) => post.id !== postId),
        },
      });
      handleClose();
    },
    variables: {
      postId,
    },
  });
  const handleDelete = () => deletePost();

  return (
    <>
      <Tooltip title="Xóa bài viết">
        <IconButton onClick={handleOpen}>
          <img src={trashIcon} alt="" className="trash-icon" />
        </IconButton>
      </Tooltip>
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
              Bạn chắc chắn muốn xóa bài viết này?
            </Typography>
            <div className="modal_btns mt-3 d-flex justify-content-end">
              <Button
                variant="contained"
                style={{ marginRight: "10px", backgroundColor: "#ff4546" }}
                onClick={handleDelete}
              >
                Xóa bài viết
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

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default DeletePost;
