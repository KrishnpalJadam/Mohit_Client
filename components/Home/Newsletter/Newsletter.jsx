"use client";

// ** Next, React And Locals Imports
import { useEffect, useState } from "react";
import { addToNewsletterAPI } from "@/actions/newsletter.actions";
import { FormTextField } from "@/helpers/FormFields";
import {
  composeValidators,
  isRequired,
  isValidEmail,
} from "@/helpers/FormValidators";
import Toaster from "@/components/Toaster/Toaster";
import ToastStatus from "@/components/Toaster/ToastStatus";
import PrimaryButton from "@/components/Button/PrimaryButton";
import useStyles from "./styles";

// ** MUI Imports
import Typography from "@mui/material/Typography";

// ** Third Party Imports
import { Form, Field } from "react-final-form";

export default function Newsletter({ dict, settings }) {
  const { classes } = useStyles();

  // States
  const [isNewsletterSubscribed, setIsNewsletterSubscribed] = useState(false);
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Showing newsletter to non subscribed customers only
    if (typeof window !== "undefined") {
      const isSubscribed = localStorage.getItem("isNewsletterSubscribed");

      if (isSubscribed) {
        setIsNewsletterSubscribed(isSubscribed);
      } else {
        setIsNewsletterSubscribed(false);
      }
    }
  }, []);

  // Add customer to newsletter
  const submit = async (value) => {
    setLoading(true);

    if (value.email) {
      const response = await addToNewsletterAPI(value.email);

      if (response?.status === 200) {
        setMessage(true);
        localStorage.setItem("isNewsletterSubscribed", true);
      } else {
        ToastStatus("Error", "Error occurred");
      }
    } else {
      return ToastStatus("Error", "Please enter your email");
    }

    setLoading(false);
  };

  return (
    <>
      <Toaster />
      {!isNewsletterSubscribed && settings?.newsletter && (
        <div className={classes.container}>
          <div className={classes.main}>
            {!message ? (
              <>
                <Typography variant="h2" sx={{ mb: 2 }}>
                  {settings.newsletterHeading}
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 3 }}>
                  {settings.newsletterText}
                </Typography>
                <Form onSubmit={submit}>
                  {({ handleSubmit }) => (
                    <form noValidate onSubmit={handleSubmit}>
                      <div className={classes.formField}>
                        <Field
                          name="email"
                          component={FormTextField}
                          validate={composeValidators(isValidEmail, isRequired)}
                          placeholder={dict.home.newsletterEmail}
                        />
                      </div>
                      <div className={classes.actionBtn}>
                        <PrimaryButton
                          type={"submit"}
                          text={settings.newsletterBtnText}
                          fullWidth={true}
                          spinner={loading}
                        />
                      </div>
                    </form>
                  )}
                </Form>
              </>
            ) : (
              <>
                <Typography variant="h2" sx={{ mb: 3 }}>
                  {settings.newsletterSuccessHeading}
                </Typography>
                <Typography variant="subtitle1">
                  {settings.newsletterSuccessText}
                </Typography>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
