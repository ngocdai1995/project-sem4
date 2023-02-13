import { Box, Container, Grid, LinearProgress, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Outlet } from "react-router-dom";
import { addToCart } from "../../components/Cart/cartSlice";
import AddToCartForm from "../components/AddToCartForm";
import ProductInfo from "../components/ProductInfo";
import ProductMenu from "../components/ProductMenu";
import ProductThumbnail from "../components/ProductThumbnail";
import useProductDetails from "../hook/useProductDetails";

const useStyle = makeStyles({
  root: {
    paddingTop: "15px",
  },
  left: {
    width: "400px",
    padding: "8px",
    borderRight: "1px solid grey",
  },
  right: {
    flex: "1 1 0",
    padding: "8px",
  },
  pagination: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    marginTop: "5px",
    paddingBottom: "8px",
  },
  loading: {
    position: "pixed",
    top: 0,
    left: 0,
    width: "100%",
  },
});

function Details() {
  const classes = useStyle();
  const { productId } = useParams();

  const { product, loading } = useProductDetails(productId);
  const dispatch = useDispatch();

  if (loading) {
    return (
      <Box className={classes.loading}>
        <LinearProgress />
      </Box>
    );
  }

  const handleAddToCartSubmit = ({ quantity }) => {
    // console.log("Form Submit", formValues);
    const action = addToCart({
      id: product.id,
      product,
      quantity,
    });
    // console.log(action);
    dispatch(action);
  };

  return (
    <Box className={classes.root}>
      <Container>
        <Paper elevation={2}>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThumbnail product={product} />
            </Grid>
            <Grid item className={classes.right}>
              <ProductInfo product={product} />
              <AddToCartForm onSubmit={handleAddToCartSubmit} />
            </Grid>
          </Grid>
        </Paper>
        <ProductMenu />
        {/* <ProductDescription product={product} /> */}
      </Container>
      <Outlet />
    </Box>
  );
}

export default Details;
