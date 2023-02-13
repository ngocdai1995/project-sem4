import { Box, List, ListItem, ListItemButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import categoryApi from "./../../../api/categoryApi";

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
};

const useStyles = makeStyles({
  root: {
    padding: "8px",
  },
  menu: {
    padding: 0,
    margin: 0,
    listStyleType: "none",
  },
});

function FilterByCategory({ onChange }) {
  const [categoryList, setCategoryList] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAll();
        setCategoryList(
          list.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        );
        // console.log({ response });
      } catch (error) {
        console.log("failed to fetch category");
      }
    })();
  }, []);

  const handleCategoryClick = (category) => {
    if (onChange) {
      onChange(category.id);
    }
  };

  return (
    <Box className={classes.root}>
      <Typography
        sx={{
          paddingLeft: "15px",
        }}
        variant="subtitle2"
      >
        DANH MỤC SẢN PHẨM
      </Typography>

      <List>
        {categoryList.map((category) => (
          <ListItem disablePadding>
            <ListItemButton
              key={category.id}
              onClick={() => handleCategoryClick(category)}
            >
              {category.name}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default FilterByCategory;
