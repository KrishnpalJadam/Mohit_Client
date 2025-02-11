"use client";

// ** Next, React And Locals Imports
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AUTH_REGISTER } from "@/graphql/Auth.js";
import { FormTextField, FormPasswordField } from "@/helpers/FormFields.js";
import {
  composeValidators,
  isValidEmail,
  isValidPassword,
  isRequired,
} from "@/helpers/FormValidators.js";
import Toaster from "@/components/Toaster/Toaster";
import ToastStatus from "@/components/Toaster/ToastStatus";
import CustomLink from "@/components/Link/CustomLink";
import CustomImage from "@/components/Image/CustomImage";
import PrimaryButton from "@/components/Button/PrimaryButton";
import SecondaryButton from "@/components/Button/SecondaryButton";
import useStyles from "@/components/Auth/Login/styles.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";

// ** Third Party Imports
import { Form, Field } from "react-final-form";
import axios from "axios";

export default function Register({ dict, websiteLogo }) {
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
        query: AUTH_REGISTER,
        variables,
      },
      {
        withCredentials: true,
      }
    );

    const authResponse = data?.data?.authRegister;

    if (authResponse?.status === 201) {
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
          {dict.register.welcomeTitle}
        </Typography>
        <Form onSubmit={submit}>
          {({ handleSubmit, invalid }) => (
            <form noValidate onSubmit={handleSubmit}>
              <div className={classes.formField}>
                <Field
                  name="email"
                  component={FormTextField}
                  validate={composeValidators(isRequired, isValidEmail)}
                  label={dict.register.formEmail}
                />
              </div>
              <div className={classes.formField}>
                <Field
                  name="password"
                  component={FormPasswordField}
                  validate={composeValidators(isRequired, isValidPassword)}
                  label={dict.register.formPassword}
                />
              </div>
              <div style={{ textAlign: "left" }}>
                <Typography variant="subtitle2" sx={{ pt: 1 }}>
                  {dict.register.termsText1}{" "}
                  <CustomLink
                    href="/content/terms-and-conditions"
                    text={dict.register.termsText2}
                    color={true}
                    hover={true}
                  />
                  , {dict.register.termsText3}{" "}
                  <CustomLink
                    href="/content/privacy-policy"
                    text={dict.register.termsText4}
                    color={true}
                    hover={true}
                  />
                  .
                </Typography>
              </div>
              <div className={classes.actionBtn}>
                <PrimaryButton
                  type="submit"
                  text={dict.register.formButton}
                  disabled={invalid}
                  fullWidth={true}
                  spinner={loading}
                />
              </div>
            </form>
          )}
        </Form>
        <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
          {dict.register.signText1}{" "}
          <CustomLink
            href="/login"
            text={dict.register.signText2}
            color={true}
            hover={true}
          />
        </Typography>
        <Divider variant="fullWidth" textAlign="center" light="false">
          {dict.register.signText3}
        </Divider>
        <div className={classes.actionBtn} onClick={handleGoogle}>
          <SecondaryButton
            text={dict.register.googleText}
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
