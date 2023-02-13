import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, Skeleton } from "@mui/material";
import ProductModel from "./ProductModel";

ProductList.propTypes = {
  data: PropTypes.array,
};

ProductList.defaultProps = {
  data: [],
};
function ProductList({ data }) {
  return (
    <Box>
      <Grid container>
        {data.map((product) => (
          <Grid item key={product.id} md={4} xs={12} sm={6}>
            <ProductModel product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductList;
