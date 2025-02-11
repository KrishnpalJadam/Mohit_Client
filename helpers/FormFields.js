// ** Next, React And Locals Imports
import { useEffect, useState } from "react";

// ** Mui Imports
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

// ** Third Party Imports
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

export const FormTextField = ({
  input,
  helperText,
  placeholder,
  meta,
  required,
  ...rest
}) => (
  <TextField
    key={input}
    variant="outlined"
    {...input}
    {...rest}
    helperText={helperText}
    placeholder={placeholder}
    required={required}
  />
);

export const FormTextFieldAdorn = ({
  input,
  helperText,
  adornment,
  position,
  meta,
  ...rest
}) => (
  <TextField
    key={input}
    variant="outlined"
    {...input}
    {...rest}
    helperText={helperText}
    InputProps={
      position === "end"
        ? {
            endAdornment: (
              <InputAdornment position="start">{adornment}</InputAdornment>
            ),
          }
        : {
            startAdornment: (
              <InputAdornment position="start">{adornment}</InputAdornment>
            ),
          }
    }
  />
);

export const FormTextArea = ({
  input,
  helperText,
  meta,
  rows,
  required,
  ...rest
}) => (
  <TextField
    key={input}
    variant="outlined"
    multiline
    rows={rows}
    {...input}
    {...rest}
    helperText={helperText}
    fullWidth
    required={required}
  />
);

export const FormPasswordField = ({ input, helperText, meta, ...rest }) => {
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <TextField
      key={input}
      variant="outlined"
      {...input}
      {...rest}
      type={values.showPassword ? "text" : "password"}
      value={values.password}
      onChange={(e) => {
        setValues({ ...values, password: e.target.value });
        input.onChange(e.target.value);
      }}
      helperText={helperText}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {values.showPassword ? (
                <MdVisibilityOff fontSize={"1em"} />
              ) : (
                <MdVisibility fontSize={"1em"} />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export const FormSelectField = ({
  input,
  meta,
  options,
  initializeValue,
  label,
  ...rest
}) => {
  const [selectValue, setSelectValue] = useState(
    initializeValue ? initializeValue : ""
  );

  useEffect(() => {
    setSelectValue(initializeValue);
  }, [initializeValue]);

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        {...input}
        {...rest}
        value={selectValue}
        label={label}
        onChange={(e) => {
          setSelectValue(e.target.value);
          input.onChange(e.target.value);
        }}
      >
        {options.map((option) => {
          return (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export const FormDesktopDatePicker = ({
  input: { onChange, label, value },
  ...rest
}) => (
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <DesktopDatePicker
      label={label}
      inputFormat="MM/dd/yyyy"
      value={value ? new Date(value) : new Date()}
      onChange={(date) => onChange(date)}
      {...rest}
      renderInput={(params) => <TextField {...params} />}
    />
  </LocalizationProvider>
);

export const FormMobileDatePicker = ({
  input: { onChange, label, value },
  ...rest
}) => (
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <MobileDatePicker
      label={label}
      inputFormat="MM/dd/yyyy"
      value={value ? new Date(value) : new Date()}
      onChange={(date) => onChange(date)}
      {...rest}
      renderInput={(params) => <TextField {...params} />}
    />
  </LocalizationProvider>
);
