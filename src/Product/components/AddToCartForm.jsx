import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import QuantityField from "../../components/form-controls/QuantityField";

const useStyles = makeStyles({
  root: {
    paddingTop: "6px",
  },
  avatar: {
    margin: "0 auto",
    backgroundColor: "#FF0066",
  },
  title: {
    marginTop: "8px",
    marginBottom: "4px",
    textAlign: "center",
  },
  submit: {
    marginTop: "10px",
  },
});

AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
};

function AddToCartForm({ onSubmit = null }) {
  const classes = useStyles();
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required("Please enter quantity")
      .min(1, "Minimum value is 1")
      .typeError("Please enter a number"),
  });
  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <QuantityField name="quantity" label="Quantity" form={form} />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submit}
        fullWidth
      >
        Add To Cart
      </Button>
    </form>
  );
}

export default AddToCartForm;
