import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import { formatPrice } from "./../../utils/common";
import { Outlet } from "react-router-dom";

ProductInfo.propTypes = {
  product: PropTypes.object,
};

const useStyles = makeStyles({
  root: {
    paddingBottom: "10px",
    borderBottom: `1px solid #eeeeee`,
  },
  description: {
    padding: "16px 0",
  },
  originalPrice: {
    marginRight: "10px",
    textDecoration: "line-through",
  },
  priceBox: {
    backgroundColor: "#eeeeee",
    padding: "10px",
  },
  salePrice: {
    marginRight: "16px",
    fontSize: "20px",
    fontWeight: "bold",
  },
});

function ProductInfo({ product = {} }) {
  const classes = useStyles();
  const { name, shortDescription, salePrice, originalPrice, promotionPercent } =
    product;

  return (
    <Box className={classes.root}>
      <Typography component="h1" variant="h4">
        {name}
      </Typography>

      <Typography variant="body2" className={classes.description}>
        {shortDescription}
      </Typography>

      <Box className={classes.priceBox}>
        <Box component="span" className={classes.salePrice}>
          {formatPrice(salePrice)}
        </Box>

        {promotionPercent > 0 && (
          <>
            <Box component="span" className={classes.originalPrice}>
              {formatPrice(originalPrice)}
            </Box>

            <Box component="span">{`-${promotionPercent}%`}</Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default ProductInfo;
