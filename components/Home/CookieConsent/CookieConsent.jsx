"use client";

// ** Next, React And Locals Imports
import CustomLink from "@/components/Link/CustomLink";
import useStyles from "./styles.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";

// ** Third Party Imports
import Cookie from "react-cookie-consent";

export default function CookieConsent({ dict }) {
  const { classes } = useStyles();

  return (
    <div>
      <Cookie
        location="bottom"
        buttonText={dict.cookieConsent.accept}
        cookieName="cookieConsent"
        disableStyles={true}
        buttonClasses={classes.cookieBtn}
        containerClasses={classes.cookieContainer}
        expires={365}
      >
        <Typography variant="subtitle1" align="left">
          {dict.cookieConsent.content}.{" "}
          <CustomLink
            href="/content/privacy-policy"
            text={dict.cookieConsent.button}
            color={true}
            hover={true}
          />
        </Typography>
      </Cookie>
    </div>
  );
}
