"use client";

// ** Next, React And Locals Imports
import CustomImage from "@/components/Image/CustomImage";
import CustomLink from "@/components/Link/CustomLink";
import SecondaryButton from "@/components/Button/SecondaryButton";
import useStyles from "./styles.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";

export default function PaymentFailed({ dict }) {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.mainCtn}>
        <div className={classes.imageContainer}>
          <CustomImage
            src={"/assets/Pleading-Face.png"}
            alt="pleading face emoji"
            fill={"true"}
          />
        </div>
        <Typography variant="h2" component="h1" sx={{ pt: 1 }}>
          {dict.payment.failedTitle}
        </Typography>
        <Typography variant="subtitle1" sx={{ pt: 3, pb: 3 }} align="center">
          {dict.payment.failedContent}
        </Typography>
        <SecondaryButton
          href="/shop/all"
          text={dict.payment.failedContinueShopping}
        />
        <div style={{ paddingTop: "20px", cursor: "pointer" }}>
          <CustomLink
            href="/help"
            text={dict.paymentHelp}
            color={true}
            hover={true}
          />
        </div>
      </div>
    </div>
  );
}
