import { Box, List, ListItem } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { NavLink, Outlet } from "react-router-dom";

ProductMenu.propTypes = {};
const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0",
  },
});

function ProductMenu(props) {
  const classes = useStyles();

  return (
    <Box>
      <List className={classes.root}>
        <ListItem
          sx={{
            justifyContent: "center",
          }}
        >
          <NavLink to="description">Description</NavLink>
        </ListItem>
        <ListItem
          sx={{
            justifyContent: "center",
          }}
        >
          <NavLink to="additional">Additonal Information</NavLink>
        </ListItem>
        <ListItem
          sx={{
            justifyContent: "center",
          }}
        >
          <NavLink to="reviews">Reviews</NavLink>
        </ListItem>
        {/* <Outlet /> */}
      </List>
    </Box>
  );
}

export default ProductMenu;
