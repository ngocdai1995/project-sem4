import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";

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
  list: {
    padding: 0,
    margin: 0,
    listStyleType: "none",
  },
});

FilterByService.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

function FilterByService({ filters = {}, onChange }) {
  const classes = useStyles();

  const handleChange = (e) => {
    if (!onChange) return;

    const { name, checked } = e.target;
    onChange({ [name]: checked });
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">DỊCH VỤ</Typography>

      <ul className={classes.list}>
        {[
          { value: "isPromotion", label: "Có khuyến mãi" },
          { value: "isFreeShip", label: "Miễn phí vận chuyển" },
        ].map((service) => (
          <li key={service.value}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(filters[service.value])}
                  onChange={handleChange}
                  name={service.value}
                  color="primary"
                />
              }
              label={service.label}
            />
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByService;
