import { useMutation } from "@apollo/client";
import * as Yup from "yup";
import { Button, IconButton } from "@mui/material";
import { FastField, Form, Formik } from "formik";
import { styled } from "@mui/material/styles";
import gql from "graphql-tag";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import PreviewImage from "../../../../components/PreviewImage";
import cameraIcon from "../../../../assets/icons/camera.svg";
import userImg from "../../../../assets/user.png";
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
  const validate = Yup.object({
    confirmNewPassword: Yup.string().when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref("password")], "Mật khẩu không khớp"),
    }),
  });

  const [uploadFile] = useMutation(UPLOAD_AVATAR, {
    onCompleted: (data) => {
      const newAvatar = data.uploadFileToDtb.url;
      const action = updateUser(newAvatar);
      dispatch(action);

      toast.success("Cập nhật thành công!", {
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

  const [changePassword] = useMutation(CHANGE_PASSWORD, {
    onCompleted: () => {
      toast.success("Cập nhật thành công!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
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

  const handleSubmit = (values) => {
    const { avatar, oldPassword, newPassword, confirmNewPassword } = values;
    if (avatar !== user.avatar) {
      uploadFile({ variables: { avatar } });
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
  };
  return (
    <>
      <Formik
        initialValues={{
          username: user.username,
          email: user.email,
          avatar: user.avatar,
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
              <div className="update-form_avatar">
                <label htmlFor="icon-button-file">
                  {values.avatar ? (
                    <PreviewImage file={values.avatar} />
                  ) : (
                    <PreviewImage file={userImg} />
                  )}
                  <input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    hidden
                    onChange={(e) => {
                      if (e.target.files[0] !== undefined) {
                        setFieldValue("avatar", e.target.files[0]);
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
              Thay đổi
            </SubmitButton>
          </Form>
        )}
      </Formik>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
    </>
  );
};

const UPLOAD_AVATAR = gql`
  mutation uploadFileToDtb($avatar: Upload!) {
    uploadFileToDtb(file: $avatar) {
      url
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
