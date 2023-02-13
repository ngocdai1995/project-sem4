import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, Skeleton } from "@mui/material";

ProductSkeleton.propTypes = {
  length: PropTypes.number,
};

ProductSkeleton.defaultProps = {
  length: 6,
};
function ProductSkeleton({ length }) {
  return (
    <Box>
      <Grid container>
        {Array.from(new Array(length)).map((x, index) => (
          <Grid item key={index} md={4} xs={12} sm={6}>
            <Box padding={1}>
              <Skeleton variant="rect" width={"100%"} height={200} />
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductSkeleton;
