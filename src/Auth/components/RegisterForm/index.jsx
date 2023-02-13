import { yupResolver } from "@hookform/resolvers/yup";
import { LockOutlined } from "@mui/icons-material";
import { Avatar, Button, LinearProgress, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../../../components/form-controls/InputField";
import PasswordField from "./../../../components/form-controls/PasswordField/index";

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

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

function RegisterForm(props) {
  const classes = useStyles();
  const schema = yup.object().shape({
    fullname: yup
      .string()
      .required("Bạn chưa nhập tên")
      .test(
        "Bạn nên nhập ít nhất 2 kí tự",
        "Vui lòng nhập lại đúng kiểu dữ liệu",
        (values) => {
          // console.log("Values", values);
          return values.split(" ").length >= 2;
        }
      ),
    email: yup
      .string()
      .required("Bạn chưa nhập Email")
      .email("Bạn chưa nhập đúng kiểu dữ liệu"),
    password: yup
      .string()
      .required("Bạn chưa nhập Password")
      .min(6, "Bạn phải nhập ít nhất 6 kí tự"),
    retypePassword: yup
      .string()
      .required("Bạn chưa nhập lại Password")
      .oneOf([yup.ref("password")], "Mật khẩu không khớp"),
  });
  const form = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      retypePassword: "",
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
      // console.log(values);
    }

    form.reset();
  };
  const { isSubmitting } = form.formState;
  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress />}

      <Avatar className={classes.avatar}>
        <LockOutlined></LockOutlined>
      </Avatar>
      <Typography className={classes.title} component="h3" variant="h5">
        Create An Account
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="fullname" label="Full Name" form={form} />
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <PasswordField
          name="retypePassword"
          label="Retype Password"
          form={form}
        />

        <Button
          disabled={isSubmitting}
          type={"submit"}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Create An Account
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
