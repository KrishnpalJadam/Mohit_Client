// ** Next, React And Locals Imports
import { useState } from "react";
import { customerEnquiryAPI } from "@/actions/enquiry.actions.js";
import { FormTextField, FormTextArea } from "@/helpers/FormFields.js";
import {
  composeValidators,
  isValidEmail,
  isMobileNumber,
  isRequired,
} from "@/helpers/FormValidators.js";
import Toaster from "@/components/Toaster/Toaster";
import CustomImage from "@/components/Image/CustomImage";
import ToastStatus from "@/components/Toaster/ToastStatus";
import PrimaryButton from "@/components/Button/PrimaryButton";
import useStyles from "./styles.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { MdClose } from "react-icons/md";

// ** Third Party Imports
import { Field, Form } from "react-final-form";

export default function ContactForm({ dict, handleClose }) {
  const { classes } = useStyles();

  // States
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (values) => {
    setLoading(true);

    const response = await customerEnquiryAPI(values);

    if (response.status === 200) {
      setMessage(true);
    } else {
      ToastStatus("Error", "Please try again later");
    }

    setLoading(false);
  };

  const closeModal = () => {
    handleClose(false);
  };

  return (
    <div className={classes.formContainer}>
      <Toaster />
      <Paper className={classes.form}>
        {message && (
          <div className={classes.message}>
            <CustomImage
              src={"/assets/Gif/mail-sent.gif"}
              alt="mail sent"
              width="100"
              height="100"
            />
            <Typography variant="h4">{dict.help.formSuccessTitle}</Typography>
            <Typography variant="subtitle1" sx={{ p: 1 }}>
              {dict.help.formSuccessText}{" "}
            </Typography>
          </div>
        )}
        <MdClose className={classes.closeIcon} onClick={closeModal} />
        <div style={{ visibility: message ? "hidden" : "visible" }}>
          <Typography variant="h4" align="center">
            {dict.help.formTitle}
          </Typography>
          <Form onSubmit={submit}>
            {({ handleSubmit, invalid }) => (
              <form noValidate onSubmit={handleSubmit}>
                <div className={classes.formField}>
                  <Field
                    name="name"
                    component={FormTextField}
                    validate={composeValidators(isRequired)}
                    label={dict.help.formName}
                    required={true}
                  />
                </div>
                <div className={classes.formField}>
                  <Field
                    name="email"
                    component={FormTextField}
                    validate={composeValidators(isRequired, isValidEmail)}
                    label={dict.help.formEmail}
                    required={true}
                  />
                </div>
                <div className={classes.formField}>
                  <Field
                    name="contactNumber"
                    component={FormTextField}
                    validate={isMobileNumber}
                    label={dict.help.formPhone}
                  />
                </div>
                <div className={classes.formField}>
                  <Field
                    name="subject"
                    component={FormTextField}
                    validate={composeValidators(isRequired)}
                    label={dict.help.formSubject}
                    required={true}
                  />
                </div>
                <div className={classes.formField}>
                  <Field
                    name="enquiry"
                    component={FormTextArea}
                    validate={composeValidators(isRequired)}
                    label={dict.help.formEnquiry}
                    rows={5}
                    required={true}
                  />
                </div>
                <div style={{ textAlign: "right", marginTop: "20px" }}>
                  <PrimaryButton
                    type={"submit"}
                    text={dict.help.formButton}
                    disabled={invalid}
                    spinner={loading}
                  />
                </div>
              </form>
            )}
          </Form>
        </div>
      </Paper>
    </div>
  );
}
