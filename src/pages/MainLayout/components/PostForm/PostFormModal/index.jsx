import React, { useState } from "react";
import { FastField, Form, Formik } from "formik";
import { Box, Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

import PostInputField from "../../../../../custom-fields/PostInputField";
import SelectChipField from "../../../../../custom-fields/SelectChipField";
import crossIcon from "../../../../../assets/icons/cross.svg";
import { FETCH_POSTS_QUERY } from "../../../../../util/graphql";
import "./styles.scss";
import { Spinner } from "reactstrap";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 3,
  borderRadius: "10px",
};

const PostFormModal = React.forwardRef((props, ref) => {
  const { open, setOpen, handleClose } = props;
  const navigate = useNavigate();
  const [values, setValues] = useState({
    body: "",
    categories: [],
  });

  const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
    update(proxy, result) {
      // const data = proxy.readQuery({
      //   query: FETCH_POSTS_PAGINATION,
      //   variables: {
      //     first: 2,
      //   },
      // });
      // proxy.writeQuery({
      //   query: FETCH_POSTS_PAGINATION,
      //   variables: {
      //     first: 2,
      //   },
      //   data: {
      //     posts: {
      //       ...data.posts,
      //       edges: [
      //         ...data.posts.edges,
      //         {
      //           node: {
      //             ...result.data.createPost,
      //             cursor: result.data.createPost.id,
      //           },
      //         },
      //       ],
      //     },
      //   },
      // });
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });

      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      setValues({
        body: "",
        categories: [],
      });
      setOpen(false);
    },
  });

  const submitForm = async (newValues) => {
    await createPost({
      variables: {
        ...newValues,
      },
    });
    navigate("/");
  };

  return (
    <Box sx={style} className="postForm_modal" open={open}>
      <div className="postForm_modal-close">
        <Button onClick={handleClose}>
          <img src={crossIcon} alt="" />
        </Button>
      </div>
      <div className="postForm_modal-header">
        <div className="postForm_modal-header-title">
          <h2>Tạo bài góp ý</h2>
        </div>
      </div>
      <div className="postForm_modal-body">
        <Formik initialValues={values} onSubmit={submitForm}>
          {(formik) => {
            return (
              <Form className="postForm_modal-control" action="">
                <FastField
                  name="body"
                  component={PostInputField}
                  placeholder="Bạn muốn góp ý như thế nào tới nhà trường?"
                  type="text"
                />

                <FastField
                  name="categories"
                  component={SelectChipField}
                  label="Chọn danh mục"
                  type="text"
                />

                <Button
                  className="btn login-btn mt-4"
                  type="submit"
                  disabled={!formik.values.body}
                >
                  {loading ? <Spinner style={{ color: "white" }} /> : "Đăng"}
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Box>
  );
});

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!, $categories: [String!]) {
    createPost(body: $body, categories: $categories) {
      id
      body
      createdAt
      author {
        id
        username
        avatar
        role
      }
      commentCount
      votesCount
      devotesCount
      categories
      reputationsCount
      votes {
        createdAt
        username
      }
      devotes {
        createdAt
        username
      }
      comments {
        id
        createdAt
        body
        author {
          username
          avatar
        }
      }
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

export default PostFormModal;
