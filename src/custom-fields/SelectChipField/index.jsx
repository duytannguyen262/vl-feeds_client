import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import React from "react";

import { chipColor } from "../../constants/chipColor";

const categories = [
  "Giảng viên",
  "Cơ sở vật chất",
  "Sự kiện",
  "Thư viện",
  "Đoàn thể",
  "Tài liệu",
  "Khác",
];

const SelectChipField = (props) => {
  const { field, form, type, label } = props;
  const { name, value, onChange, onBlur } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  const [category, setCategory] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div className="select-field">
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-multiple-chip-label" className="mb-2">
          {label}
        </InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={category}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label={label} />}
          renderValue={(selected) => {
            return (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => {
                  return (
                    <Chip
                      key={value}
                      label={value}
                      style={{
                        backgroundColor: chipColor(value),
                        color: "white",
                        fontWeight: "500",
                      }}
                    />
                  );
                })}
              </Box>
            );
          }}
          style={{ width: "100%" }}
          {...props}
          {...field}
        >
          {categories.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectChipField;
