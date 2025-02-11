"use client";

// ** Next, React And Locals Imports
import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { customersAPI } from "@/actions/customers.actions.js";
import { getCustomer } from "@/redux/slices/customer.js";
import {
  FormTextField,
  FormSelectField,
  FormMobileDatePicker,
  FormDesktopDatePicker,
} from "@/helpers/FormFields.js";
import {
  composeValidators,
  isValidEmail,
  isMobileNumber,
  isRequired,
} from "@/helpers/FormValidators.js";
import GreetingsLayout from "@/components/Profile/GreetingsLayout/GreetingsLayout";
import Sidebar from "@/components/Profile/Sidebar/Sidebar";
import DropzoneSingle from "@/components/Profile/ProfileSettings/DropzoneSingle";
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
import { BsChevronRight } from "react-icons/bs";

export default function ProfileSettings({ dict, customerData }) {
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

  const genders = [
    {
      value: dict.account.genderMale,
    },
    {
      value: dict.account.genderFemale,
    },
  ];

  //  Update profile
  const submit = async (values) => {
    setIsLoading(true);

    const valuesObject = {
      firstName: values.firstName,
      lastName: values.lastName,
      avatar: values.avatar,
      phoneNumber: values.phoneNumber,
      gender: values.gender,
      dob: values.dob,
    };

    const response = await customersAPI(valuesObject);

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
              {dict.account.profileTitle}
            </Typography>
            <Form onSubmit={submit} initialValues={customer}>
              {({ handleSubmit, invalid }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <div className={classes.dropzoneField}>
                    <Field name="avatar">
                      {(props) => (
                        <div>
                          <DropzoneSingle dict={dict} {...props.input} />
                        </div>
                      )}
                    </Field>
                  </div>
                  <div className={classes.formFields}>
                    <div className={classes.formField}>
                      <Field
                        name="firstName"
                        component={FormTextField}
                        label={dict.account.formFirstName}
                      />
                    </div>
                    <div className={classes.formField}>
                      <Field
                        name="lastName"
                        component={FormTextField}
                        label={dict.account.formLastName}
                      />
                    </div>
                  </div>
                  <div className={classes.formFields}>
                    <div className={classes.formField}>
                      <Field
                        name="email"
                        component={FormTextField}
                        validate={composeValidators(isRequired, isValidEmail)}
                        label={dict.account.formEmail}
                        disabled
                      />
                    </div>
                    <div className={classes.formField}>
                      <Field
                        name="phoneNumber"
                        component={FormTextField}
                        validate={isMobileNumber}
                        label={dict.account.formPhoneNumber}
                      />
                    </div>
                  </div>
                  <div className={classes.formFields}>
                    <div className={classes.formField}>
                      <Field
                        name="gender"
                        component={FormSelectField}
                        label={dict.account.formGender}
                        options={genders}
                        initializeValue={customer.gender || ""}
                      />
                    </div>
                    {/* Desktop Date Picker */}
                    <div
                      className={`${classes.formField} ${classes.desktopDatePicker}`}
                    >
                      <Field
                        name="dob"
                        component={FormDesktopDatePicker}
                        label={dict.account.formDob}
                      />
                    </div>
                    {/* Mobile Date Picker */}
                    <div
                      className={`${classes.formField} ${classes.mobileDatePicker}`}
                    >
                      <Field
                        name="dob"
                        component={FormMobileDatePicker}
                        label={dict.account.formDob}
                      />
                    </div>
                  </div>
                  <div className={classes.actionBtn}>
                    <PrimaryButton
                      type="submit"
                      disabled={invalid}
                      text={dict.account.formSave}
                      spinner={isLoading}
                    />
                  </div>
                </form>
              )}
            </Form>
          </Paper>
        </div>
      </div>
      <Link href="/profile/address">
        <div className={classes.prevNext}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            {dict.account.next} <BsChevronRight fontSize={"0.75em"} />
          </Typography>
          <Typography variant="h5">{dict.account.addressTitle}</Typography>
        </div>
      </Link>
    </div>
  );
}
