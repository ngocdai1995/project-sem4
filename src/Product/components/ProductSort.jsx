import React from "react";
import PropTypes from "prop-types";
import { Tab, Tabs } from "@mui/material";

ProductSort.propTypes = {
  currentSort: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

function ProductSort({ currentSort, onChange }) {
  const handleSortChange = (event, newValues) => {
    if (onChange) onChange(newValues);
  };
  return (
    <Tabs
      value={currentSort}
      indicatorColor="primary"
      textColor="primary"
      onChange={handleSortChange}
    >
      <Tab label="GIÁ THẤP TỚI CAO" value={"salePrice:ASC"} />
      <Tab label="GIÁ CAO TỚI THẤP" value={"salePrice:DESC"} />
    </Tabs>
  );
}

export default ProductSort;
