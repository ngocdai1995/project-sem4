import { ShoppingCart } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { Badge } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useSelector } from "react-redux";
import Register from "../Auth/components/RegisterForm";
import { cartItemsCountSelector } from "./Cart/selector";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const cartItemsCount = useSelector(cartItemsCountSelector);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SHOP ONLINE
          </Typography>
          <Button color="inherit">Product</Button>
          <Button color="inherit">Category</Button>
          <Button color="inherit" onClick={handleClickOpen}>
            Register
          </Button>
          <IconButton
            onClick={handleCartClick}
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={cartItemsCount} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Dialog
        disableEscapeKeyDown
        onBackdropClick
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
          <Register />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
