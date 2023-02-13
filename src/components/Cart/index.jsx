import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { cartTotalSelector } from "./selector";

Cart.propTypes = {};

function Cart(props) {
  const cartTotal = useSelector(cartTotalSelector);
  return <div>Total Cart: {cartTotal}</div>;
}

export default Cart;
