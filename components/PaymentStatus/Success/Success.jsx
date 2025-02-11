"use client";

// ** Next, React And Locals Imports
import { useEffect, useState } from "react";
import Link from "next/link";
import SocialsFilter from "@/helpers/SocialsFilter";
import CustomImage from "@/components/Image/CustomImage";
import SecondaryButton from "@/components/Button/SecondaryButton";
import useStyles from "./styles.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";

// ** Third Party Imports
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function PaymentSuccess({
  dict,
  orderData,
  isGuestOrder,
  socials,
}) {
  const { classes } = useStyles();

  // For confetti
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  // Socials
  const socialNetworks = ["facebook", "instagram", "twitter", "youtube"];

  return (
    <div className={classes.container}>
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={300}
          className={classes.confetti}
        />
      )}
      <div className={classes.mainCtn}>
        <div className={classes.imageContainer}>
          <CustomImage
            src={"/assets/Star-Struck.png"}
            alt="star struck emoji"
            fill={"true"}
          />
        </div>
        <Typography variant="h2" component="h1" sx={{ pt: 1 }} align="center">
          {dict.payment.successTitle}
        </Typography>
        <Typography variant="subtitle1" sx={{ pt: 3, pb: 3 }} align="center">
          {dict.payment.successContent}
        </Typography>
        <div className={classes.btns}>
          <div className={classes.actionBtn}>
            <SecondaryButton
              href="/shop/all"
              text={dict.payment.successContinueShopping}
              fullWidth={true}
            />
          </div>
          <div className={classes.actionBtn}>
            <SecondaryButton
              href={
                isGuestOrder
                  ? `/orders/${orderData?._id}`
                  : `/profile/orders/${orderData?._id}`
              }
              text={dict.payment.successViewOrder}
              fullWidth={true}
            />
          </div>
        </div>
        <Typography variant="subtitle1" sx={{ pt: 5, pb: 1 }} align="center">
          {dict.payment.successSocial}
        </Typography>
        <div>
          {socials &&
            socialNetworks.map((network, index) => (
              <Link
                key={index}
                href={SocialsFilter(socials, network)}
                target="_blank"
                rel="noreferrer"
              >
                <div className={classes.socialLogo}>
                  <CustomImage
                    src={`/assets/${network}.png`}
                    alt="social logo"
                    width={35}
                    height={35}
                  />
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
