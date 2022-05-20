import React from "react";

import { Button, Tooltip } from "@mui/material";
import { FastField, Form, Formik } from "formik";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useSelector } from "react-redux";

import PostCommentField from "../../../../custom-fields/PostCommentField";
import PaperPlaneIcon from "../../../../assets/icons/paper-plane.svg";
import shieldCheckIcon from "../../../../assets/icons/shield-check.svg";
import "./styles.scss";

const ResponseInput = ({ postId }) => {
  const user = useSelector((state) => state.auth.user);

  const [submitComment] = useMutation(CREATE_COMMENT_MUTATION, {
    update() {},
  });
  const handleComment = (values) => {
    values.response !== "" &&
      submitComment({
        variables: {
          postId,
          body: values.response,
        },
      });
  };

  const [submitAnswer] = useMutation(CREATE_ANSWER_MUTATION, {
    update() {},
  });
  const handleAnswer = (values) => {
    if (values.response !== "") {
      submitAnswer({
        variables: {
          postId,
          body: values.response,
        },
      });
    }
  };

  return (
    <>
      {user && (
        <Formik
          initialValues={{
            response: "",
          }}
        >
          {(formik) => {
            const { handleChange, handleBlur, values } = formik;
            return (
              <Form className="responseInput">
                <FastField
                  name="response"
                  placeholder="Bạn nghĩ gì về bài góp ý này?"
                  component={PostCommentField}
                  type="text"
                  value={values.response}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></FastField>
                {(user.role === "teacher" || user.role === "admin") && (
                  <Tooltip title="Gửi câu trả lời">
                    <Button
                      type="button"
                      className="responseInput-btn check"
                      onClick={() => {
                        handleAnswer(values);
                        formik.resetForm({
                          response: "",
                        });
                      }}
                    >
                      <img src={shieldCheckIcon} alt="" />
                    </Button>
                  </Tooltip>
                )}
                <Tooltip title="Gửi bình luận" placement="bottom">
                  <Button
                    type="button"
                    className="responseInput-btn"
                    onClick={() => {
                      handleComment(values);
                      formik.resetForm({
                        response: "",
                      });
                    }}
                  >
                    <img src={PaperPlaneIcon} alt="" />
                  </Button>
                </Tooltip>
              </Form>
            );
          }}
        </Formik>
      )}
    </>
  );
};

const CREATE_COMMENT_MUTATION = gql`
  mutation ($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        author {
          username
          avatar {
            url
          }
        }
      }
      commentCount
    }
  }
`;

const CREATE_ANSWER_MUTATION = gql`
  mutation ($postId: ID!, $body: String!) {
    createAnswer(postId: $postId, body: $body) {
      id
      answers {
        id
        body
        createdAt
        author {
          username
          avatar {
            url
          }
        }
      }
    }
  }
`;

export default ResponseInput;
