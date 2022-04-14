import { useMutation, useQuery } from "@apollo/client";
import { Button, IconButton, Input } from "@mui/material";
import { FastField, Form, Formik } from "formik";
import { styled } from "@mui/material/styles";
import gql from "graphql-tag";
import React from "react";
import { useSelector } from "react-redux";
import PreviewImage from "../../../../components/PreviewImage";
import cameraIcon from "../../../../assets/icons/camera.svg";

import "./styles.scss";
import UpdateInputField from "../../../../custom-fields/UpdateInputField";

const SubmitButton = styled(Button)({
  borderRadius: "6px",
  backgroundSize: "200%",
  backgroundImage: "linear-gradient(to right, #D4145A , #FBB03B, #D4145A)",
  transform: "translateX(-60px)",
  padding: "10px 30px",
  float: "right",
  transition: "0.3s ease-in-out",
  "&:hover": {
    backgroundPosition: "right",
  },
});

const UpdateUserForm = () => {
  const user = useSelector((state) => state.auth.user);
  const [uploadFile] = useMutation(UPLOAD_AVATAR, {
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const handleSubmit = (values) => {
    const { avatar, newPassword } = values;
    if (avatar !== user.avatar) {
      uploadFile({ variables: { avatar } });
    }
  };
  return (
    <>
      <Formik
        initialValues={{
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          password: "",
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        }}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="update-form">
              <div className="update-form_avatar">
                <label htmlFor="icon-button-file">
                  {values.avatar && <PreviewImage file={values.avatar} />}
                  <Input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    hidden
                    onChange={(e) => setFieldValue("avatar", e.target.files[0])}
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
                    component={UpdateInputField}
                    label="Mật khẩu:"
                    type="password"
                    disabled
                  />
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
            <SubmitButton type="submit" variant="contained">
              Thay đổi
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </>
  );
};

const UPLOAD_AVATAR = gql`
  mutation singleUpload($avatar: Upload!) {
    singleUpload(file: $avatar) {
      url
    }
  }
`;
export default UpdateUserForm;
