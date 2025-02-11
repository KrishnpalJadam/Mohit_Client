"use client";

// ** Next, React And Locals Imports
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AUTH_LOGIN } from "@/graphql/Auth.js";
import { isRequired } from "@/helpers/FormValidators.js";
import { FormTextField, FormPasswordField } from "@/helpers/FormFields.js";
import Toaster from "@/components/Toaster/Toaster";
import ToastStatus from "@/components/Toaster/ToastStatus";
import CustomImage from "@/components/Image/CustomImage";
import CustomLink from "@/components/Link/CustomLink";
import PrimaryButton from "@/components/Button/PrimaryButton";
import SecondaryButton from "@/components/Button/SecondaryButton";
import useStyles from "./styles.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";

// ** Third Party Imports
import { Form, Field } from "react-final-form";
import axios from "axios";

export default function Login({ dict, websiteLogo }) {
  const { classes } = useStyles();
  const router = useRouter();

  // States
  const [loading, setLoading] = useState(false);

  // Handling the authentication
  const submit = async (values) => {
    setLoading(true);

    const variables = {
      email: values.email.toLowerCase(),
      password: values.password,
    };

    const { data } = await axios.post(
      process.env.NEXT_PUBLIC_GRAPHQL_URL,
      {
        query: AUTH_LOGIN,
        variables,
      },
      {
        withCredentials: true,
      }
    );

    const authResponse = data?.data?.authLogin;

    if (authResponse?.status === 200) {
      router.push("/");
    } else {
      ToastStatus("Error", authResponse.message);
    }

    setLoading(false);
  };

  // Google login
  const handleGoogle = async () => {
    window.open(process.env.NEXT_PUBLIC_BACKEND_URL + "auth/google", "_self");
  };

  return (
    <div className={classes.container}>
      <Toaster />
      <Paper className={classes.form}>
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
        <Typography variant="h4" sx={{ mt: 4 }}>
          {dict.login.welcomeTitle}
        </Typography>
        <Form onSubmit={submit}>
          {({ handleSubmit, invalid }) => (
            <form noValidate onSubmit={handleSubmit}>
              <div className={classes.formField}>
                <Field
                  name="email"
                  component={FormTextField}
                  validate={isRequired}
                  label={dict.login.formEmail}
                />
              </div>
              <div className={classes.formField}>
                <Field
                  name="password"
                  component={FormPasswordField}
                  validate={isRequired}
                  label={dict.login.formPassword}
                />
              </div>
              <Typography variant="subtitle1" sx={{ textAlign: "right" }}>
                <CustomLink
                  href="/forgot-password"
                  text={dict.login.formForgotPassword}
                  color={true}
                  hover={true}
                />
              </Typography>
              <div className={classes.actionBtn}>
                <PrimaryButton
                  type="submit"
                  text={dict.login.formButton}
                  disabled={invalid}
                  fullWidth={true}
                  spinner={loading}
                />
              </div>
            </form>
          )}
        </Form>
        <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
          {dict.login.signUpText1}{" "}
          <CustomLink
            href="/register"
            text={dict.login.signUpText2}
            color={true}
            hover={true}
          />
        </Typography>
        <Divider variant="fullWidth" textAlign="center" light={false}>
          {dict.login.signUpText3}
        </Divider>
        <div className={classes.actionBtn} onClick={handleGoogle}>
          <SecondaryButton
            type="submit"
            text={dict.login.googleText}
            fullWidth={true}
            startIcon={
              <Avatar
                src={"/assets/google.png"}
                sx={{ width: 30, height: 30 }}
              />
            }
          />
        </div>
      </Paper>
    </div>
  );
}
