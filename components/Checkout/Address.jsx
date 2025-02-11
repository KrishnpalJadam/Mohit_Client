// ** Next, React And Locals Imports
import {
  composeValidators,
  isMobileNumber,
  isRequired,
  isValidEmail,
  isValidPincode,
} from "@/helpers/FormValidators.js";
import { FormTextField } from "@/helpers/FormFields.js";
import PrimaryButton from "@/components/Button/PrimaryButton";
import SecondaryButton from "@/components/Button/SecondaryButton";
import useStyles from "./styles.js";

// ** MUI Imports
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

// ** Third Party Imports
import { Form, Field } from "react-final-form";

export default function Address({
  dict,
  customer,
  authenticatedCustomerProfile,
  defaultAddress,
  handleDefaultAddress,
  handleAccordion,
  handleDiffAddress,
}) {
  const { classes } = useStyles();

  //  Address Details Form Submit
  const submit = (values) => {
    const valuesObject = {
      name: values.name,
      email: values.email,
      phoneNumber: values.phoneNumber,
      address: {
        address1: values.address1,
        address2: values.address2,
        city: values.city,
        state: values.state,
        country: values.country,
        postal_code: values.postal_code,
      },
    };

    handleDiffAddress(valuesObject, false, true);
  };

  return (
    <Paper className={classes.addressDetails}>
      {/* By default defaultAddress value is true */}
      {authenticatedCustomerProfile?.address && (
        <FormControlLabel
          sx={{
            width: "100%",
            justifyContent: "end",
            pb: 3,
          }}
          control={
            <Checkbox
              checked={defaultAddress}
              onChange={() => handleDefaultAddress(!defaultAddress)}
              color="primary"
            />
          }
          label={dict.checkout.defaultAddress}
        />
      )}
      {authenticatedCustomerProfile?.address && defaultAddress && customer && (
        <>
          <Card>
            <CardContent>
              <Typography variant="subtitle1">
                <b>{dict.checkout.customerName}</b>:{" "}
                {authenticatedCustomerProfile.firstName}
              </Typography>
              <Typography variant="subtitle1">
                <b>{dict.checkout.customerEmail}</b>:{" "}
                {authenticatedCustomerProfile.email}
              </Typography>
              <Typography variant="subtitle1">
                <b>{dict.checkout.customerPhone}</b>:{" "}
                {authenticatedCustomerProfile.phoneNumber}
              </Typography>
              <Typography variant="subtitle1">
                <b> {dict.checkout.customerAddress}</b>:{" "}
                {authenticatedCustomerProfile.address?.address1},
                {authenticatedCustomerProfile.address?.city},
                {authenticatedCustomerProfile.address?.state},
                {authenticatedCustomerProfile.address?.country} -{" "}
                {authenticatedCustomerProfile.address?.postal_code}
              </Typography>
            </CardContent>
          </Card>
          <div
            className={classes.btn}
            onClick={() => handleAccordion(false, true)}
          >
            <PrimaryButton
              text={dict.checkout.continueToPayment}
              fullWidth={true}
            />
          </div>
          <div
            className={classes.btn}
            onClick={() => handleDefaultAddress(!defaultAddress)}
          >
            <SecondaryButton text={dict.checkout.newAddress} fullWidth={true} />
          </div>
        </>
      )}
      {(!authenticatedCustomerProfile?.address ||
        (!authenticatedCustomerProfile?.address && customer === null) ||
        !defaultAddress) && (
        <Form onSubmit={submit}>
          {({ handleSubmit, invalid }) => (
            <form noValidate onSubmit={handleSubmit}>
              <div className={classes.formField}>
                <Field
                  name="name"
                  component={FormTextField}
                  validate={isRequired}
                  placeholder={dict.checkout.formName}
                  label={dict.checkout.formName}
                  required
                />
              </div>
              <div className={classes.formField}>
                <Field
                  name="email"
                  component={FormTextField}
                  validate={composeValidators(isRequired, isValidEmail)}
                  placeholder={dict.checkout.formEmail}
                  label={dict.checkout.formEmail}
                  required
                />
              </div>
              <div className={classes.formField}>
                <Field
                  name="phoneNumber"
                  component={FormTextField}
                  validate={composeValidators(isRequired, isMobileNumber)}
                  placeholder={dict.checkout.formPhone}
                  label={dict.checkout.formPhone}
                  required
                />
              </div>
              <div className={classes.formField}>
                <Field
                  name="address1"
                  component={FormTextField}
                  validate={isRequired}
                  placeholder={dict.checkout.formAddress}
                  label={dict.checkout.formAddress}
                  required
                />
              </div>
              <div className={classes.formField}>
                <Field
                  name="address2"
                  component={FormTextField}
                  placeholder={dict.checkout.formLandmark}
                  label={dict.checkout.formLandmark}
                />
              </div>
              <div className={classes.formField}>
                <Field
                  name="city"
                  component={FormTextField}
                  validate={isRequired}
                  placeholder={dict.checkout.formCity}
                  label={dict.checkout.formCity}
                  required
                />
              </div>
              <div className={classes.formField}>
                <Field
                  name="state"
                  component={FormTextField}
                  validate={isRequired}
                  placeholder={dict.checkout.formState}
                  label={dict.checkout.formState}
                  required
                />
              </div>
              <div className={classes.formField}>
                <Field
                  name="country"
                  component={FormTextField}
                  validate={composeValidators(isRequired)}
                  placeholder={dict.checkout.formCountry}
                  label={dict.checkout.formCountry}
                  required
                />
              </div>
              <div className={classes.formField}>
                <Field
                  name="postal_code"
                  component={FormTextField}
                  validate={composeValidators(isRequired, isValidPincode)}
                  placeholder={dict.checkout.formPostalCode}
                  label={dict.checkout.formPostalCode}
                  required
                />
              </div>
              <div className={classes.btn}>
                <PrimaryButton
                  type="submit"
                  text={dict.checkout.continueToPayment}
                  disabled={invalid}
                  fullWidth={true}
                />
              </div>
            </form>
          )}
        </Form>
      )}
    </Paper>
  );
}
