import { Container, Grid, Pagination, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useEffect, useMemo, useState } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import productApi from "../../api/productApi";
import FilterViewer from "../components/Filters/FilterViewer";
import ProductFilters from "../components/ProductFilters";
import ProductList from "../components/ProductList";
import ProductSkeleton from "../components/ProductSkeleton";
import ProductSort from "../components/ProductSort";
import queryString from "query-string";

const useStyle = makeStyles({
  root: {
    paddingTop: "15px",
  },
  left: {
    width: "250px",
  },
  right: {
    flex: "1 1 0",
  },
  pagination: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    marginTop: "5px",
    paddingBottom: "8px",
  },
});
function Product() {
  const classes = useStyle();

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 9,
      _sort: params._sort || "salePrice:ASC",
      isPromotion: params.isPromotion === "true",
      isFreeShip: params.isFreeShip === "true",
    };
  }, [location.search]);
  // console.log(queryParams);

  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 9,
    total: 10,
    page: 1,
  });
  // const [filters, setFilters] = useState({
  //   _page: 1,
  //   _limit: 9,
  //   _sort: "salePrice:ASC",
  // });

  // const [filters, setFilters] = useState(() => ({
  //   ...queryParams,
  //   _page: Number.parseInt(queryParams._page) || 1,
  //   _limit: Number.parseInt(queryParams._limit) || 9,
  //   _sort: queryParams._sort || "salePrice:ASC",
  // }));

  // useEffect(() => {
  //   navigate({
  //     pathname: navigate.location,
  //     search: `${createSearchParams(filters)}`,
  //   });
  // }, [navigate, filters]);

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
        // console.log({data, pagination});
        setProductList(data);
        setPagination(pagination);
      } catch (error) {
        console.log("failed", error);
      }

      setLoading(false);
    })();
  }, [queryParams]);

  const handlePageChange = (page) => {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   _page: page,
    // }));
    const filters = {
      ...queryParams,
      _page: page,
    };

    navigate({
      pathname: navigate.location,
      search: `${createSearchParams(filters)}`,
    });
  };

  const handleSortChange = (newSortValue) => {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   _sort: newSortValue,
    // }));
    const filters = {
      ...queryParams,
      _sort: newSortValue,
    };
    navigate({
      pathname: navigate.location,
      search: `${createSearchParams(filters)}`,
    });
  };

  const handleFilterChange = (newFilters) => {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   ...newFilters,
    // }));
    const filters = {
      ...queryParams,
      ...newFilters,
    };
    navigate({
      pathname: navigate.location,
      search: `${createSearchParams(filters)}`,
    });
  };

  const setNewFilters = (newFilters) => {
    // setFilters(newFilters);
    navigate({
      pathname: navigate.location,
      search: `${createSearchParams(newFilters)}`,
    });
  };

  return (
    <Box>
      <Container>
        <Grid container className={classes.root}>
          <Grid item className={classes.left}>
            <Paper elevation={2}>
              <ProductFilters
                filters={queryParams}
                onChange={handleFilterChange}
              />
            </Paper>
          </Grid>

          <Grid item className={classes.right}>
            <Paper elevation={2}>
              <ProductSort
                currentSort={queryParams._sort}
                onChange={handleSortChange}
              />
              <FilterViewer filters={queryParams} onChange={setNewFilters} />

              {loading ? (
                <ProductSkeleton length={9} />
              ) : (
                <ProductList data={productList} />
              )}

              <Box className={classes.pagination}>
                <Pagination
                  onChange={handlePageChange}
                  color="primary"
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={pagination.page}
                ></Pagination>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Product;
