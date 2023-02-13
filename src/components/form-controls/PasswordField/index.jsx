import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Controller } from "react-hook-form";

PasswordField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function PasswordField(props) {
  const { form, name, label, disable } = props;
  const { control } = form;
  const hasError = !!control[name];

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((x) => !x);
  };

  return (
    <div>
      <FormControl
        fullWidth
        margin="normal"
        variant="outlined"
        error={hasError}
      >
        <InputLabel htmlFor={name}>{label}</InputLabel>

        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, onBlur, value, name } }) => (
            <OutlinedInput
              id={name}
              type={showPassword ? "text" : "password"}
              label={label}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleShowPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              disabled={disable}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />

        <FormHelperText>{control[name]?.message}</FormHelperText>
      </FormControl>
    </div>
  );
}

export default PasswordField;
