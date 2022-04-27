import { useMutation } from "@apollo/client";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Spinner } from "reactstrap";
import gql from "graphql-tag";
import { useDispatch } from "react-redux";
import { login } from "../authSlice";

import logo from "../../../assets/logo.png";
import office from "../../../assets/office.svg";
import InputField from "../../../custom-fields/InputField";
import "./styles.scss";

const LoginForm = () => {
  const [values, setValues] = useState({
    userName: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = Yup.object({
    userName: Yup.string()
      .max(15, "Chỉ nhập tối đa 15 kí tự")
      .required("Tên đăng nhập không được để trống"),
    password: Yup.string().required("Mật khẩu không được để trống"),
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      localStorage.setItem("jwtToken", userData.token);
      const action = login(userData);
      dispatch(action);
      navigate("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
  });

  const submitForm = async (newValues) => {
    await loginUser({
      variables: newValues,
    });
  };

  return (
    <>
      <div style={{ width: "90%" }}>
        <div className="login-form_appLogo--container">
          <img src={logo} alt="" />
        </div>

        <h1 className="login-form_header">Đăng nhập</h1>
        <Formik
          initialValues={values}
          validationSchema={validate}
          onSubmit={submitForm}
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
                  name="password"
                  component={InputField}
                  label="Mật khẩu"
                  type="password"
                />

                <button type="submit" className="btn login-btn">
                  {loading ? (
                    <Spinner style={{ color: "white" }} />
                  ) : (
                    "Đăng nhập"
                  )}
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

const LOGIN_USER = gql`
  mutation login($userName: String!, $password: String!) {
    login(username: $userName, password: $password) {
      id
      email
      username
      createdAt
      token
      avatar
      role
    }
  }
`;

export default LoginForm;
