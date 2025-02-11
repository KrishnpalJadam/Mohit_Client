"use client";

// ** Next, React And Locals Imports
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  sendVerificationCodeAPI,
  resetPasswordAPI,
} from "@/actions/auth.actions";
import { FormTextField, FormPasswordField } from "@/helpers/FormFields";
import {
  composeValidators,
  isValidEmail,
  isRequired,
  isValidPassword,
} from "@/helpers/FormValidators";
import PrimaryButton from "@/components/Button/PrimaryButton";
import Toaster from "@/components/Toaster/Toaster";
import ToastStatus from "@/components/Toaster/ToastStatus";
import CustomImage from "@/components/Image/CustomImage";
import useStyles from "./styles.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

// ** Third Party Imports
import { Form, Field } from "react-final-form";
import { MuiOtpInput } from "mui-one-time-password-input";
import { MdLockOpen } from "react-icons/md";

export default function ForgotPassword({ dict, websiteLogo }) {
  const { classes } = useStyles();
  const router = useRouter();

  // States
  const [currentTab, setCurrentTab] = useState(null);
  const [sessionEmail, setSessionEmail] = useState(null);
  const [verificationCode, setVerificationCode] = useState("");

  useEffect(() => {
    // Checking whether user already requested verification code or not
    const email = sessionStorage.getItem("session_email");

    if (email) {
      setSessionEmail(email);
      setCurrentTab("tab2");
    } else {
      setCurrentTab("tab1");
    }
  }, []);

  // Send verification code
  const sendVerificationCode = async (values) => {
    if (!values.email) {
      ToastStatus("Error", "Please refresh the page");
    }

    const response = await sendVerificationCodeAPI(values);

    if (response) {
      if (response?.status === 200) {
        ToastStatus("Success", response.message);

        // Setting the email in session storage
        sessionStorage.setItem("session_email", values.email.toLowerCase());

        setCurrentTab("tab2");
      } else {
        ToastStatus("Error", response?.message);
      }
    } else {
      ToastStatus("Error", "Try again later!");
    }
  };

  // Handle verification code change
  const handleVerificationCodeChange = (newValue) => {
    setVerificationCode(newValue);
  };

  // Handling the reset password
  const submit = async (values) => {
    const variables = {
      email: values.email?.toLowerCase() || sessionEmail,
      newPassword: values.newPassword,
      confirmNewPassword: values.confirmNewPassword,
      verificationCode,
    };

    const response = await resetPasswordAPI(variables);

    if (response?.status === 200) {
      ToastStatus("Success", "Password changed, Redirecting...");

      sessionStorage.removeItem("session_email");

      setTimeout(() => {
        router.push("/login");
      }, [2000]);
    } else if (response?.status === 401) {
      // Invalid or expired verification code
      ToastStatus("Error", response.message);

      sessionStorage.removeItem("session_email");

      setCurrentTab("tab1");
    } else {
      ToastStatus("Error", response.message);
    }
  };

  return (
    <div className={classes.container}>
      <Toaster />
      <Paper className={classes.paper}>
        <div>
          {websiteLogo && (
            <CustomImage
              src={process.env.NEXT_PUBLIC_BACKEND_URL + "logos/" + websiteLogo}
              alt="website logo"
              width={130}
              height={50}
            />
          )}
        </div>
        <Form onSubmit={submit}>
          {({ handleSubmit, values, invalid }) => (
            <form noValidate onSubmit={handleSubmit}>
              {/* Tab 1 - Verification code request */}
              {currentTab === "tab1" && (
                <div>
                  <Typography variant="h4" sx={{ pb: 1 }}>
                    {dict.forgotPassword.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {dict.forgotPassword.text}
                  </Typography>
                  <div className={classes.formField}>
                    <Field
                      name="email"
                      component={FormTextField}
                      validate={composeValidators(isValidEmail, isRequired)}
                      label={dict.forgotPassword.formEmail}
                    />
                  </div>
                  <div className={classes.actionBtn}>
                    <PrimaryButton
                      text={dict.forgotPassword.formButton}
                      onClick={() => sendVerificationCode(values)}
                      size="large"
                      disabled={invalid}
                      fullWidth
                      endIcon={<MdLockOpen />}
                    />
                  </div>
                  <Typography
                    variant="subtitle2"
                    className={classes.backToLogin}
                  >
                    <Link href="/login">{dict.forgotPassword.backToLogin}</Link>
                  </Typography>
                </div>
              )}
              {/* Tab 2 - Reset password */}
              {currentTab === "tab2" && (
                <div>
                  <Typography variant="h4" sx={{ pb: 1 }}>
                    {dict.resetPassword.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {dict.resetPassword.text}
                  </Typography>
                  <div className={classes.formField}>
                    <Field
                      name="newPassword"
                      type="password"
                      component={FormPasswordField}
                      validate={composeValidators(isValidPassword, isRequired)}
                      label={dict.resetPassword.formPassword1}
                    />
                  </div>
                  <div className={classes.formField}>
                    <Field
                      name="confirmNewPassword"
                      type="password"
                      component={FormPasswordField}
                      validate={composeValidators(isValidPassword, isRequired)}
                      label={dict.resetPassword.formPassword2}
                    />
                  </div>
                  <div className={classes.verificationCode}>
                    <Typography
                      variant="subtitle1"
                      sx={{ pb: 1.5 }}
                      align="left"
                      color="text.secondary"
                    >
                      {dict.resetPassword.verificationCode}:
                    </Typography>
                    <MuiOtpInput
                      value={verificationCode}
                      onChange={handleVerificationCodeChange}
                      length={6}
                      TextFieldsProps={{ placeholder: "-" }}
                    />
                  </div>
                  <div className={classes.actionBtn}>
                    <PrimaryButton
                      type="submit"
                      text={dict.resetPassword.formButton}
                      disabled={invalid || verificationCode?.length !== 6}
                      size="large"
                      fullWidth
                    />
                  </div>
                  <Typography
                    variant="subtitle2"
                    className={classes.backToLogin}
                  >
                    <Link href="/login">{dict.resetPassword.backToLogin}</Link>
                  </Typography>
                </div>
              )}
            </form>
          )}
        </Form>
      </Paper>
    </div>
  );
}
