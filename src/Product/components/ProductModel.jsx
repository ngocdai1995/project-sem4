import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from "../../constants";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "./../../utils/common";

const useStyles = makeStyles({
  name: {
    paddingLeft: "10px",
  },
});

ProductModel.propTypes = {
  product: PropTypes.object,
};

function ProductModel({ product }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : THUMBNAIL_PLACEHOLDER;

  const handleCLick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <Box padding={1} onClick={handleCLick}>
      {/* <Skeleton variant="rect" width={"100%"} height={118} /> */}
      <Box padding={1} minHeight="160px">
        <img src={thumbnailUrl} alt={product.name} width="100%" />
      </Box>
      <Typography className={classes.name} variant="body2">
        {product.name}
      </Typography>
      <Typography className={classes.name} variant="body2">
        <Box component={"span"} fontSize="16px" fontWeight={"bold"}>
          {formatPrice(product.salePrice)}
        </Box>

        {product.promotionPercent > 0 ? ` - ${product.promotionPercent}%` : ""}
      </Typography>
    </Box>
  );
}

export default ProductModel;
