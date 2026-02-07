import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import { useState } from "react";
import { Alert, Spinner } from "reactstrap";
import { Modal, useModal } from "@nextui-org/react";

import logo from "../../../../assets/logo.png";
import checkGif from "../../../../assets/gifs/check.gif";
import InputField from "../../../../custom-fields/InputField";
import "./styles.scss";

const RegisterForm = () => {
  const { setVisible, bindings } = useModal();
  const [values, setValues] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validate = Yup.object({
    userName: Yup.string()
      .min(3, "Tên đăng nhập phải có ít nhất 3 ký tự")
      .max(15, "Chỉ nhập tối đa 15 kí tự")
      .required("Tên đăng nhập không được để trống")
      .matches(/^[a-zA-Z0-9]+$/, "Tên đăng nhập không được chứa ký tự đặc biệt")
      .matches(/(?!^\d+$)^.+$/, "Tên đăng nhập không được để tất cả là số"),
    email: Yup.string()
      .min(3, "Email phải có ít nhất 3 ký tự")
      .email("Email không hợp lệ")
      .required("Email không được để trống"),
    password: Yup.string().required("Mật khẩu không được để trống"),
    confirmPassword: Yup.string().when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref("password")], "Mật khẩu không khớp"),
    }),
  });
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update() {
      setVisible(true);
      setValues({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
  });

  const submitForm = async (newValues) => {
    await addUser({
      variables: newValues,
    });
  };

  return (
    <>
      <div style={{ width: "90%" }}>
        <div className="login-form_appLogo--container">
          <img src={logo} alt="" />
        </div>
        <Modal
          width="50%"
          style={{ maxWidth: "800px", margin: "0 auto" }}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          {...bindings}
        >
          <div className="registedSuccess-modal_container">
            <div className="registedSuccess-modal_gif">
              <img src={checkGif} alt="" />
            </div>
            <h3>Đăng ký thành công!</h3>
            <p>Hãy truy cập vào email đã đăng ký để xác thực tài khoản nhé!</p>
          </div>
        </Modal>
        <h1 className="login-form_header">Đăng kí</h1>
        <Formik
          initialValues={values}
          validationSchema={validate}
          onSubmit={(values, { resetForm }) => {
            submitForm(values);
          }}
        >
          {(formik) => {
            return (
              <Form className="login-form_control" action="">
                <FastField
                  name="userName"
                  component={InputField}
                  label="Tên đăng nhập"
                  placeholder="Nhập tên đăng nhập"
                  type="text"
                />
                <FastField
                  name="email"
                  component={InputField}
                  label="Email"
                  placeholder="E.g: John@vanlanguni.vn"
                  type="email"
                />
                <FastField
                  name="password"
                  component={InputField}
                  label="Mật khẩu"
                  type="password"
                />
                <FastField
                  name="confirmPassword"
                  component={InputField}
                  label="Xác nhận mật khẩu"
                  type="password"
                />
                <button type="submit" className="btn login-btn">
                  {loading ? <Spinner style={{ color: "white" }} /> : "Đăng kí"}
                </button>
                {Object.keys(errors).length > 0 && (
                  <Alert color="danger" className="my-4">
                    {Object.values(errors).map((value) => (
                      <p key={value}>{value}</p>
                    ))}
                  </Alert>
                )}
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $userName: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $userName
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default RegisterForm;
