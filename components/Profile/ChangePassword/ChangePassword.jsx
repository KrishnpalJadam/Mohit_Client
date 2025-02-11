"use client";

// ** Next, React And Locals Imports
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordAPI } from "@/actions/auth.actions.js";
import { getCustomer } from "@/redux/slices/customer.js";
import { FormTextField, FormPasswordField } from "@/helpers/FormFields.js";
import {
  composeValidators,
  isRequired,
  isValidPassword,
} from "@/helpers/FormValidators.js";
import Sidebar from "@/components/Profile/Sidebar/Sidebar";
import GreetingsLayout from "@/components/Profile/GreetingsLayout/GreetingsLayout";
import Toaster from "@/components/Toaster/Toaster";
import ToastStatus from "@/components/Toaster/ToastStatus";
import PrimaryButton from "@/components/Button/PrimaryButton";
import useStyles from "./styles.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

// ** Third Party Imports
import { Field, Form } from "react-final-form";
import { BsChevronLeft } from "react-icons/bs";

export default function ChangePassword({ dict, customerData }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { classes } = useStyles();

  // States
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (customerData) {
      dispatch(getCustomer(customerData));
    }
  }, [customerData]);

  const customer = useSelector((state) => state.customer.customer);

  //  Update customer password
  const submit = async (values) => {
    setIsLoading(true);

    if (values.newPassword.localeCompare(values.confirmNewPassword) === 0) {
      const valuesObject = {
        password: values.newPassword,
      };

      const response = await changePasswordAPI(valuesObject);

      if (response?.status === 200) {
        ToastStatus("Success", response.message);

        setTimeout(() => {
          router.push("/login");
        }, [2000]);
      } else {
        ToastStatus("Error", "Error Occurred");
      }
    } else {
      ToastStatus("Emoji", "Password do not match", "😯");
    }

    setIsLoading(false);
  };

  return (
    <div className={classes.container}>
      <Toaster />
      <GreetingsLayout dict={dict} customer={customer} />
      <Divider sx={{ mt: 3 }} />
      <div className={classes.mainContainer}>
        <div className={classes.sidebar}>
          <Sidebar dict={dict} />
        </div>
        <div className={classes.main}>
          <Paper className={classes.form}>
            <Typography variant="h4" sx={{ mb: 3 }}>
              {dict.account.changePasswordTitle}
            </Typography>
            <Form onSubmit={submit}>
              {({ handleSubmit, invalid }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <div className={classes.formField}>
                    <Field
                      name="newPassword"
                      component={FormPasswordField}
                      validate={composeValidators(isRequired, isValidPassword)}
                      label={dict.account.newPassword}
                      helperText={dict.account.newPasswordText}
                    />
                  </div>
                  <div
                    className={classes.formField}
                    style={{ marginTop: "20px" }}
                  >
                    <Field
                      name="confirmNewPassword"
                      type="password"
                      component={FormTextField}
                      validate={composeValidators(isRequired, isValidPassword)}
                      label={dict.account.confirmPassword}
                    />
                  </div>
                  <div className={classes.actionBtn}>
                    <PrimaryButton
                      type="submit"
                      text={dict.account.changePasswordTitle}
                      disabled={invalid}
                      spinner={isLoading}
                    />
                  </div>
                </form>
              )}
            </Form>
          </Paper>
        </div>
      </div>
      <Link href="/profile/coupons">
        <div className={classes.prevNext}>
          <Typography variant="h5" sx={{ pb: 1 }}>
            <BsChevronLeft fontSize={"0.75em"} />
            {dict.account.prev}
          </Typography>
          <Typography variant="h5"> {dict.account.couponsTitle}</Typography>
        </div>
      </Link>
    </div>
  );
}
