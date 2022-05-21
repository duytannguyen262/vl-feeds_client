import { useMutation, useQuery } from "@apollo/client";
import * as Yup from "yup";
import { Button, IconButton } from "@mui/material";
import { FastField, Form, Formik } from "formik";
import { styled } from "@mui/material/styles";
import gql from "graphql-tag";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Axios from "axios";
import { Spinner } from "reactstrap";

import PreviewImage from "../../../../components/PreviewImage";
import cameraIcon from "../../../../assets/icons/camera.svg";
import userImg from "../../../../assets/user.png";
import bannerImg from "../../../../assets/authBanner.jpg";
import UpdateInputField from "../../../../custom-fields/UpdateInputField";
import { updateUser } from "../../../auth/authSlice";
import "./styles.scss";

const SubmitButton = styled(Button)({
  borderRadius: "6px",
  backgroundSize: "200%",
  backgroundImage: "linear-gradient(to right, #D4145A , #FBB03B, #D4145A)",
  float: "right",
  transform: "translateX(-60px)",
  padding: "10px 30px",
  transition: "0.3s ease-in-out",
  marginBottom: "50px",
  "&:hover": {
    backgroundPosition: "right",
  },
  "&.Mui-disabled": {
    backgroundImage: "none",
  },
});

const UpdateUserForm = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = React.useState({});
  const { data } = useQuery(GET_USER, {
    variables: {
      userId: user.id,
    },
  });

  useEffect(() => {
    if (data) {
      setUserInfo(data.getUser);
      console.log(data);
    }
    return () => toast.dismiss();
  }, [data]);

  const validate = Yup.object({
    confirmNewPassword: Yup.string().when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref("password")], "Mật khẩu không khớp"),
    }),
  });

  const [uploadFile] = useMutation(UPLOAD_IMG, {
    onCompleted: (data) => {
      const action = updateUser(data.uploadUserImg);
      dispatch(action);
    },
  });

  const [changePassword] = useMutation(CHANGE_PASSWORD, {
    onError(err) {
      toast.error(err.graphQLErrors[0].message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (values) => {
    const { banner, avatar, oldPassword, newPassword, confirmNewPassword } =
      values;
    if (
      (avatar && avatar.type && avatar.type.match("image.*")) ||
      (banner && banner.type && banner.type.match("image.*"))
    ) {
      setIsLoading(true);
      const cloudName = process.env.REACT_APP_CLOUD_NAME;
      const apiKey = process.env.REACT_APP_API_KEY;
      const uploadPreset = "profile_upload";
      const upload = async (file) => {
        if (!file.url) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", uploadPreset);
          formData.append("api_key", apiKey);

          const response = await Axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            formData,
            {
              headers: { "X-Requested-With": "XMLHttpRequest" },
            }
          );
          const data = response.data;
          const fileURL = data.secure_url;
          const public_id = data.public_id;
          return {
            url: fileURL,
            public_id: public_id,
          };
        }
      };
      if (avatar.name) {
        const avatarUrl = await upload(avatar);
        await uploadFile({
          variables: {
            avatar: {
              url: avatarUrl.url,
              public_id: avatarUrl.public_id,
            },
          },
        });
      }

      if (banner.name) {
        const bannerUrl = await upload(banner);
        await uploadFile({
          variables: {
            banner: {
              url: bannerUrl.url,
              public_id: bannerUrl.public_id,
            },
          },
        });
      }
      setIsLoading(false);
    }
    if (oldPassword && newPassword && confirmNewPassword) {
      changePassword({
        variables: {
          oldPassword,
          newPassword,
          confirmNewPassword,
        },
      });
    }

    toast.success("Cập nhật thành công!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <>
      <Formik
        initialValues={{
          username: user.username,
          email: user.email,
          avatar: {
            url: user.avatar.url,
          },
          banner: {
            url: user.banner.url,
          },
          role: user.role,
          password: "",
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        }}
        validationSchema={validate}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
        }}
      >
        {({ values, setFieldValue, dirty }) => (
          <Form>
            <div className="update-form">
              <div className="update-form_banner">
                <label htmlFor="banner-file">
                  {values && (
                    <PreviewImage
                      file={
                        values.banner.url === "" ? { bannerImg } : values.banner
                      }
                    />
                  )}
                  <input
                    accept="image/*"
                    id="banner-file"
                    type="file"
                    hidden
                    onChange={(e) => {
                      if (e.target.files[0] !== undefined) {
                        setFieldValue("banner", e.target.files[0]);
                        setUserInfo({
                          ...userInfo,
                          banner: e.target.files[0],
                        });
                      }
                    }}
                  />
                </label>
              </div>
              <div className="update-form_avatar">
                <label htmlFor="icon-button-file">
                  {values && (
                    <PreviewImage
                      file={
                        values.avatar.url === "" ? { userImg } : values.avatar
                      }
                    />
                  )}
                  <input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    hidden
                    onChange={(e) => {
                      if (e.target.files[0] !== undefined) {
                        setFieldValue("avatar", e.target.files[0]);
                        setUserInfo({
                          ...userInfo,
                          avatar: e.target.files[0],
                        });
                      }
                    }}
                  />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    sx={{ backgroundColor: "white" }}
                  >
                    <img src={cameraIcon} alt="" />
                  </IconButton>
                </label>
              </div>
              <div className="update-form_user-container">
                <div
                  style={{
                    width: "90%",
                    margin: "0 auto",
                  }}
                >
                  <FastField
                    name="username"
                    component={UpdateInputField}
                    label="Tài khoản:"
                    type="text"
                    disabled
                  />
                  <FastField
                    name="email"
                    component={UpdateInputField}
                    label="Email:"
                    type="text"
                    disabled
                  />
                  <FastField
                    name="role"
                    component={UpdateInputField}
                    label="Vai trò:"
                    type="text"
                    disabled
                  />
                  <FastField
                    component={UpdateInputField}
                    label="Mật khẩu:"
                    type="password"
                    disabled
                  />
                  <h1
                    className="my-4"
                    style={{ fontSize: "20px", fontWeight: "500" }}
                  >
                    Thay đổi mật khẩu
                  </h1>
                  <FastField
                    name="oldPassword"
                    component={UpdateInputField}
                    label="Mật khẩu cũ:"
                    type="password"
                  />
                  <FastField
                    name="newPassword"
                    component={UpdateInputField}
                    label="Mật khẩu mới:"
                    type="password"
                  />
                  <FastField
                    name="confirmNewPassword"
                    component={UpdateInputField}
                    label="Xác nhận mật khẩu mới:"
                    type="password"
                  />
                </div>
              </div>
            </div>
            <SubmitButton type="submit" variant="contained" disabled={!dirty}>
              {isLoading ? <Spinner style={{ color: "white" }} /> : "Thay đổi"}
            </SubmitButton>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </>
  );
};

const GET_USER = gql`
  query ($userId: ID!) {
    getUser(userId: $userId) {
      id
      username
      email
      avatar {
        url
      }
      banner {
        url
      }
      followedPosts {
        id
      }
      role
    }
  }
`;
const UPLOAD_IMG = gql`
  mutation uploadUserImg($avatar: ImageInputs, $banner: ImageInputs) {
    uploadUserImg(avatar: $avatar, banner: $banner) {
      avatar {
        url
      }
      banner {
        url
      }
    }
  }
`;

const CHANGE_PASSWORD = gql`
  mutation changePassword(
    $oldPassword: String!
    $newPassword: String!
    $confirmNewPassword: String!
  ) {
    changePassword(
      password: $oldPassword
      newPassword: $newPassword
      confirmNewPassword: $confirmNewPassword
    ) {
      message
    }
  }
`;
export default UpdateUserForm;
