import { FastField, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import logo from "../../../assets/logo.png";
import office from "../../../assets/office.svg";
import InputField from "../../../custom-fields/InputField";
import "./styles.scss";

const LoginForm = () => {
  const validate = Yup.object({
    userName: Yup.string()
      .max(15, "Chỉ nhập tối đa 15 kí tự")
      .required("Tên đăng nhập không được để trống"),
    password: Yup.string().required("Mật khẩu không được để trống"),
  });
  return (
    <>
      <div style={{ width: "90%" }}>
        <div className="login-form_appLogo--container">
          <img src={logo} alt="" />
        </div>

        <h1 className="login-form_header">Đăng nhập</h1>
        <Formik
          initialValues={{
            userName: "",
            password: "",
            rememberMe: false,
          }}
          validationSchema={validate}
          onSubmit={(values) => console.log(values)}
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

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label py-1"
                    for="flexCheckDefault"
                  >
                    Ghi nhớ mật khẩu
                  </label>
                </div>

                <button type="submit" className="btn login-btn">
                  Đăng nhập
                </button>

                <div className="login-form_strikethru-text">
                  <span>Hoặc</span>
                </div>
                <button className="login-form_office--container">
                  <img src={office} alt="" />
                  <span>Office 365 for Students</span>
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default LoginForm;
