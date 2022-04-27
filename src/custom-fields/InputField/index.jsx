import React from "react";

const InputField = (props) => {
  const { field, form, label } = props;
  const { name } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  return (
    <div className="login-form_input-field">
      <label htmlFor={name}>
        <span>{label}</span>
      </label>

      <input
        className={`form-control ${showError ? "is-invalid" : ""}`}
        type="text"
        {...field}
        {...props}
      />
      {showError && <div className="invalid-feedback mt-2">{errors[name]}</div>}
    </div>
  );
};

export default InputField;
