import React, { useState } from "react";
import { FastField, Form, Formik } from "formik";
import { Box, Button, ImageList, ImageListItem } from "@mui/material";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Spinner } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import PostInputField from "../../../../../custom-fields/PostInputField";
import SelectChipField from "../../../../../custom-fields/SelectChipField";
import crossIcon from "../../../../../assets/icons/cross.svg";
import { FETCH_POSTS_QUERY } from "../../../../../util/graphql";
import "./styles.scss";

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
    files: [],
  });
  const [previewImages, setPreviewImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          posts: {
            ...data.posts,
            edges: [
              {
                __typename: "Edge",
                node: {
                  ...result.data.createPost,
                },
                cursor: result.data.createPost.id,
              },
              ...data.posts.edges,
            ],
          },
        },
      });
      setValues({
        body: "",
        categories: [],
        files: [],
      });
      setOpen(false);
    },
  });

  const submitForm = async (newValues) => {
    setIsLoading(true);
    const { files } = newValues;

    //check if pictures are images
    const isImages = Array.from(files).every((picture) => {
      return picture.type.includes("image");
    });

    if (isImages) {
      const picturesToUpload = [];
      const cloudName = process.env.REACT_APP_CLOUD_NAME;
      const apiKey = process.env.REACT_APP_API_KEY;
      const uploadPreset = process.env.REACT_APP_UPLOAD_PRESET;

      const uploaders = Array.from(files).map((file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);
        formData.append("api_key", apiKey);

        return Axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData,
          {
            headers: { "X-Requested-With": "XMLHttpRequest" },
          }
        ).then((response) => {
          const data = response.data;
          const fileURL = data.secure_url;
          const public_id = data.public_id;
          picturesToUpload.push({ url: fileURL, public_id: public_id });
        });
      });
      Axios.all(uploaders).then(() => {
        setIsLoading(false);
        createPost({
          variables: {
            body: newValues.body,
            categories: newValues.categories,
            pictures: picturesToUpload,
          },
        });
        navigate("/");
      });
    } else {
      toast.error("Hãy chọn đúng định dạng hình ảnh!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setIsLoading(false);
    }
  };

  return (
    <Box sx={style} className="postForm_modal" open={open}>
      <ToastContainer />
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
          {({ values, setFieldValue }) => {
            return (
              <Form className="postForm_modal-control" action="">
                <FastField
                  name="body"
                  component={PostInputField}
                  placeholder="Bạn muốn góp ý như thế nào tới nhà trường?"
                  type="text"
                />

                <label htmlFor="contained-button-file" className="mb-3">
                  <input
                    accept="image/*"
                    id="contained-button-file"
                    hidden
                    multiple
                    type="file"
                    onChange={(e) => {
                      if (e.target.files[0] !== undefined) {
                        setFieldValue("files", e.target.files);
                        setPreviewImages(e.target.files);
                      }
                    }}
                  />
                  <Button
                    variant="contained"
                    component="span"
                    sx={{ background: "#448aff" }}
                  >
                    <PhotoCamera />
                    &nbsp;Chọn ảnh
                  </Button>
                </label>
                {previewImages.length > 0 && (
                  <ImageList
                    sx={{ height: 300 }}
                    cols={3}
                    rowHeight={164}
                    className="mb-3"
                  >
                    {Array.from(previewImages).map((image, index) => (
                      <ImageListItem key={index}>
                        <img src={URL.createObjectURL(image)} alt="" />
                      </ImageListItem>
                    ))}
                  </ImageList>
                )}

                <FastField
                  name="categories"
                  component={SelectChipField}
                  label="Chọn danh mục"
                  type="text"
                />

                <Button
                  className="btn login-btn mt-4"
                  type="submit"
                  disabled={!values.body.trim() || loading || isLoading}
                >
                  {loading || isLoading ? (
                    <Spinner style={{ color: "white" }} />
                  ) : (
                    "Đăng"
                  )}
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
  mutation createPost(
    $body: String!
    $categories: [String!]
    $pictures: [ImageInputs!]
  ) {
    createPost(body: $body, categories: $categories, pictures: $pictures) {
      id
      body
      createdAt
      author {
        id
        username
        avatar {
          url
        }
        role
      }
      pictures {
        url
        public_id
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
          avatar {
            url
          }
        }
      }
      answers {
        id
        createdAt
        body
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

export default PostFormModal;
