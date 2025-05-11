import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Typography,
  Select,
  Checkbox,
  ListItemText,
  InputLabel,
  FormControl,
} from "@mui/material";

const InputWithValidation = ({
  type = "text",
  label = "Input",
  options = [],
  required = false,
  value: externalValue = "",
  onChange,
  onValidate,
  multiline,
  minRows,
  maxRows,
  maxChars,
  readOnly,
  fullWidth = true,
  suggested = false,
  title,
  labelTranform,
  multiple = false, // <-- New prop to control multiple selection
}) => {
  const [value, setValue] = useState(externalValue);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  useEffect(() => {
    setValue(externalValue);
  }, [externalValue]);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    if (onChange) onChange(inputValue);

    let validationError = false;
    let validationMessage = "";

    if (
      type === "select" &&
      multiple &&
      required &&
      (!inputValue || inputValue.length === 0)
    ) {
      validationError = true;
      validationMessage = "At least one option must be selected";
    } else if (maxChars && inputValue?.length > maxChars) {
      validationError = true;
      validationMessage = `Maximum ${maxChars} ${
        type === "number" ? "digits" : "characters"
      } allowed`;
    } else if (required && !inputValue) {
      validationError = true;
      validationMessage = "This field is required";
    } else if (
      type === "email" &&
      inputValue &&
      !/\S+@\S+\.\S+/.test(inputValue)
    ) {
      validationError = true;
      validationMessage = "Enter a valid email";
    } else if (type === "number" && inputValue && isNaN(inputValue)) {
      validationError = true;
      validationMessage = "Enter a valid number";
    }

    setError(validationError);
    setHelperText(validationMessage);
    if (onValidate) onValidate(validationError);
  };

  if (type === "select" && multiple) {
    return (
      <FormControl fullWidth size="small" variant="standard" error={error}>
        <InputLabel shrink>{label + (required ? "*" : "")}</InputLabel>
        <Select
          multiple
          fullWidth={fullWidth}
          value={value || []}
          onChange={handleChange}
          renderValue={(selected) =>
            selected
              .map((val) => {
                const found = options.find(
                  (opt) => opt?.value === val || opt?.name === val
                );
                return found?.label || found?.name || val;
              })
              .join(", ")
          }
          title={title}
          sx={{ fontSize: 12 }}
          readOnly={readOnly}
        >
          {options.map((option, index) => {
            const val = option?.value || option?.name;
            const label = option?.label || option?.name;
            return (
              <MenuItem key={index} value={val}>
                <Checkbox size="small" checked={value?.includes(val)} />
                <ListItemText
                  primaryTypographyProps={{
                    textTransform: "capitalize",
                    fontSize: 12,
                  }}
                  primary={label}
                />
              </MenuItem>
            );
          })}
        </Select>
        <Typography variant="caption" color="error">
          {helperText}
        </Typography>
      </FormControl>
    );
  }

  return (
    <TextField
      label={
        label +
        (required ? (suggested ? "Suggested" : "*") : "") +
        (maxChars
          ? ` (${maxChars - value?.length < 0 ? 0 : maxChars - value?.length})`
          : "")
      }
      fullWidth={fullWidth}
      type={type === "select" ? undefined : type}
      value={maxChars ? value?.slice(0, maxChars) : value}
      onChange={handleChange}
      size="small"
      error={error}
      helperText={helperText}
      select={type === "select"}
      focused={suggested}
      color={suggested ? "success" : "info"}
      title={
        title
          ? title
          : maxChars !== undefined
          ? `Max. ${maxChars} characters allowed`
          : ""
      }
      variant="standard"
      placeholder={label}
      minRows={minRows}
      maxRows={maxRows}
      multiline={multiline}
      slotProps={{
        input: {
          sx: { padding: 0.2, fontSize: 12, color: suggested ? "#338c33" : "" },
          readOnly: readOnly,
        },
        inputLabel: {
          shrink: true,
          sx: { fontSize: 16, textTransform: labelTranform || "capitalize" },
        },
      }}
    >
      {type === "select" &&
        options.map((option, index) => (
          <MenuItem
            sx={{ fontSize: 10 }}
            key={index}
            value={option?.value || option?.name}
          >
            {option?.attributes?.min} {option?.attributes?.min && " - "}{" "}
            {option?.label || option?.name}
          </MenuItem>
        ))}
    </TextField>
  );
};

export default InputWithValidation;
