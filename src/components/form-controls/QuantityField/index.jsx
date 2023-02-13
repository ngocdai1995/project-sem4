import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

PasswordField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

const useStyles = makeStyles({
  root: {},
  box: {
    display: "flex",
    width: "150px",
    alignItems: "center",
  },
});

function PasswordField(props) {
  const classes = useStyles();
  const { form, name, label, disable } = props;
  const { control, setValue } = form;

  const hasError = !!control[name];

  return (
    <div>
      <FormControl
        fullWidth
        margin="normal"
        variant="outlined"
        error={hasError}
        size="small"
      >
        <Typography>{label}</Typography>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, onBlur, value, name } }) => (
            <Box className={classes.box}>
              <IconButton
                onClick={() =>
                  setValue(
                    name,
                    Number.parseInt(value) ? Number.parseInt(value) - 1 : 1
                  )
                }
              >
                <RemoveCircleOutline />
              </IconButton>

              <OutlinedInput
                id={name}
                type="number"
                disabled={disable}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
              <IconButton
                onClick={() =>
                  setValue(
                    name,
                    Number.parseInt(value) ? Number.parseInt(value) + 1 : 1
                  )
                }
              >
                <AddCircleOutline />
              </IconButton>
            </Box>
          )}
        />

        <FormHelperText>{control[name]?.message}</FormHelperText>
      </FormControl>
    </div>
  );
}

export default PasswordField;
