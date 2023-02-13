import { Box, Chip, List, ListItem, ListItemButton } from "@mui/material";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    width: "300px",
  },
});

const FILTER_LIST = [
  {
    id: 1,
    getLabel: () => "Giao hàng miễn phí",
    isActive: (filters) => filters.isFreeShip,
    isVisible: () => true,
    isRemovable: false,
    onRemove: () => {},
    onToggle: (filters) => {
      const newFilter = { ...filters };
      if (filters.isFreeShip) {
        delete newFilter.isFreeShip;
      } else {
        newFilter.isFreeShip = true;
      }

      return newFilter;
    },
  },
  {
    id: 2,
    getLabel: () => "Có khuyến mãi",
    isActive: () => true,
    isVisible: (filters) => filters.isPromotion,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.isPromotion;
      return newFilters;
    },
    onToggle: () => {},
  },
  {
    id: 3,
    getLabel: (filters) =>
      `Từ ${filters.salePrice_gte} đến ${filters.salePrice_lte}`,
    isActive: () => true,
    isVisible: (filters) =>
      Object.keys(filters).includes("salePrice_lte") &&
      Object.keys(filters).includes("salePrice_gte"),
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.salePrice_lte;
      delete newFilters.salePrice_gte;
      return newFilters;
    },
    onToggle: () => {},
  },
  //   {
  //     id: 4,
  //     getLabel: (filters) => `Danh mục: ${filters["category.id"]}`,
  //     isActive: () => true,
  //     isVisible: (filters) => filters["category.id"],
  //     isRemovable: true,
  //     onRemove: (filters) => {
  //       const newFilters = { ...filters };
  //       delete newFilters["category.id"];
  //       return newFilters;
  //     },
  //     onToggle: (filters) => {},
  //   },
];

FilterViewer.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

function FilterViewer({ filters = {}, onChange = null }) {
  const classes = useStyles();
  const visibleFilter = useMemo(() => {
    return FILTER_LIST.filter((x) => x.isVisible(filters));
  }, [filters]);
  return (
    <Box>
      <List className={classes.root}>
        {visibleFilter.map((x) => (
          <ListItem disablePadding key={x.id}>
            <ListItemButton>
              <Chip
                label={x.getLabel(filters)}
                color={x.isActive(filters) ? "primary" : "default"}
                clickable={!x.isRemovable}
                size="small"
                onClick={
                  x.isRemovable
                    ? null
                    : () => {
                        if (!onChange) return;

                        const newFilters = x.onToggle(filters);
                        onChange(newFilters);
                      }
                }
                onDelete={
                  x.isRemovable
                    ? () => {
                        if (!onChange) return;

                        const newFilters = x.onRemove(filters);
                        onChange(newFilters);
                      }
                    : null
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default FilterViewer;