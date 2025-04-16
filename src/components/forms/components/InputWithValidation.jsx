import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Typography } from "@mui/material";

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
  suggested = false,
  title,
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

    if (maxChars && inputValue.length > maxChars) {
      validationError = true;
      validationMessage = `Maximum ${maxChars} ${
        type === "number" ? "Digits " : "characters"
      }  allowed`;
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

  return (
    <TextField
      label={
        label +
        (required ? (suggested ? "Suggested" : "*") : "") +
        (maxChars ? ` (${maxChars - value?.length})` : "")
      }
      type={type === "select" ? undefined : type}
      value={maxChars ? value?.slice(0, maxChars) : value}
      onChange={handleChange}
      size="small"
      error={error}
      helperText={helperText}
      select={type === "select"}
      fullWidth
      focused={suggested}
      color={suggested ? "success" : "info"}
      title={
        title
          ? title
          : maxChars !== undefined
          ? `Max. ${maxChars} Charactors Allowed `
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
          sx: { fontSize: 16 },
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
