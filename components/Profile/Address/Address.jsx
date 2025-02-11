"use client";

// ** Next, React And Locals Imports
import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { customersAPI } from "@/actions/customers.actions.js";
import { getCustomer } from "@/redux/slices/customer.js";
import { FormTextField } from "@/helpers/FormFields.js";
import {
  composeValidators,
  isRequired,
  isValidPincode,
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
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

export default function Address({ dict, customerData }) {
  const dispatch = useDispatch();
  const { classes } = useStyles();

  // States
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (customerData) {
      dispatch(getCustomer(customerData));
    }
  }, [customerData]);

  const customer = useSelector((state) => state.customer.customer);

  // Customer address
  const address = customer?.address;

  //  Update address
  const submit = async (values) => {
    setIsLoading(true);

    const variables = {
      address: {
        address1: values.address1,
        address2: values.address2,
        city: values.city,
        state: values.state,
        country: values.country,
        postal_code: values.postal_code,
      },
    };

    const response = await customersAPI(variables);

    if (response?.status === 200) {
      dispatch(getCustomer(response));
      ToastStatus("Success", response.message);
    } else {
      ToastStatus("Error", "Error Occurred");
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
              {dict.account.addressTitle}
            </Typography>
            <Form onSubmit={submit} initialValues={address}>
              {({ handleSubmit, invalid }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <div className={classes.formField}>
                    <Field
                      name="address1"
                      component={FormTextField}
                      validate={isRequired}
                      label={dict.account.formAddress}
                      required={true}
                      placeholder={dict.account.formAddress}
                    />
                  </div>
                  <div
                    className={classes.formField}
                    style={{ marginTop: "30px" }}
                  >
                    <Field
                      name="address2"
                      component={FormTextField}
                      label={dict.account.formLandmark}
                      placeholder={dict.account.formLandmark}
                    />
                  </div>
                  <div className={classes.formFields}>
                    <div className={classes.formField}>
                      <Field
                        name="city"
                        component={FormTextField}
                        validate={isRequired}
                        label={dict.account.formCity}
                        required={true}
                      />
                    </div>
                    <div className={classes.formField}>
                      <Field
                        name="state"
                        component={FormTextField}
                        validate={isRequired}
                        label={dict.account.formState}
                        required={true}
                      />
                    </div>
                  </div>
                  <div className={classes.formFields}>
                    <div className={classes.formField}>
                      <Field
                        name="country"
                        component={FormTextField}
                        validate={isRequired}
                        label={dict.account.formCountry}
                        required={true}
                      />
                    </div>
                    <div className={classes.formField}>
                      <Field
                        name="postal_code"
                        component={FormTextField}
                        validate={composeValidators(isRequired, isValidPincode)}
                        label={dict.account.formPostalCode}
                        required={true}
                      />
                    </div>
                  </div>
                  <div className={classes.actionBtn}>
                    <PrimaryButton
                      type="submit"
                      text={dict.account.formSave}
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
      <div className={classes.prevNext}>
        <Link href="/profile">
          <Typography variant="h5" sx={{ pb: 1 }}>
            <BsChevronLeft fontSize={"0.75em"} />
            {dict.account.prev}
          </Typography>
          <Typography variant="h5"> {dict.account.profileTitle}</Typography>
        </Link>
        <Link href="/profile/orders">
          <Typography variant="h5" sx={{ pb: 1 }}>
            {dict.account.next}
            <BsChevronRight fontSize={"0.75em"} />
          </Typography>
          <Typography variant="h5">{dict.account.ordersTitle}</Typography>
        </Link>
      </div>
    </div>
  );
}
