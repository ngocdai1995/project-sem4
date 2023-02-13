import React from "react";
import PropTypes from "prop-types";
import { Paper } from "@mui/material";
import DOMPurify from "dompurify";
import { Outlet } from "react-router-dom";
ProductDescription.propTypes = {
  product: PropTypes.object,
};

function ProductDescription({ product = {} }) {
  const safeDescription = DOMPurify.sanitize(product.description);
  return (
    <Paper
      elevation={0}
      sx={{
        padding: "10px",
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: safeDescription }} />
      {/* <Outlet /> */}
    </Paper>
  );
}

export default ProductDescription;
