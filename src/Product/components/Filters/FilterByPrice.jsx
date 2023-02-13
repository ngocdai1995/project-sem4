import { Box, Button, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import { useState } from "react";

const useStyles = makeStyles({
  root: {
    borderTop: "1px solid grey",
    padding: "10px",
  },
  range: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
    marginTop: "10px",
    marginBottom: "10px",
  },
});

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
};

function FilterByPrice({ onChange }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    // console.log(values);
    if (onChange) onChange(values);
    setValues({
      salePrice_gte: 0,
      salePrice_lte: 0,
    });
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">CHỌN KHOẢNG GIÁ</Typography>

      <Box className={classes.range}>
        <TextField
          inputProps={{
            style: {
              padding: 5,
            },
          }}
          name="salePrice_gte"
          value={values.salePrice_gte}
          onChange={handleChange}
        />
        <span>-</span>
        <TextField
          inputProps={{
            style: {
              padding: 5,
            },
          }}
          name="salePrice_lte"
          value={values.salePrice_lte}
          onChange={handleChange}
        />
      </Box>

      <Button
        variant="outlined"
        color="primary"
        size="small"
        onClick={handleSubmit}
      >
        Áp dụng
      </Button>
    </Box>
  );
}

export default FilterByPrice;
