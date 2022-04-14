import { alpha, InputBase, styled } from "@mui/material";
import React from "react";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    width: "70%",
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    marginTop: "0px",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const UpdateInputField = (props) => {
  const { field, form, label } = props;
  const { name } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  return (
    <div className="update-form_user-field d-flex justify-content-between mb-3">
      <label htmlFor={name}>
        <span>{label}</span>
      </label>

      <BootstrapInput
        className={`${showError ? "is-invalid" : ""}`}
        type="text"
        {...field}
        {...props}
      />
      {showError && <div className="invalid-feedback mt-2">{errors[name]}</div>}
    </div>
  );
};

export default UpdateInputField;
