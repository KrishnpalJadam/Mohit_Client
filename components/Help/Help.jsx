"use client";

// ** Next, React And Locals Imports
import { useState } from "react";
import ContactForm from "./ContactForm";
import SecondaryButton from "@/components/Button/SecondaryButton";
import CustomImage from "@/components/Image/CustomImage";
import useStyles from "./styles.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";

export default function Help({ dict }) {
  const { classes } = useStyles();

  // States
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  };

  // To open tidio chat
  const openTidioChat = () => {
    window.tidioChatApi.open();
  };

  return (
    <div className={classes.container}>
      <div className={classes.intro}>
        <div className={classes.introContent}>
          <Typography variant="h1">{dict.help.title}</Typography>
        </div>
      </div>
      <div className={classes.reachOut}>
        <Typography variant="h3">{dict.help.reachOutTitle}</Typography>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          {dict.help.reachOutText}
        </Typography>
      </div>
      <div className={classes.grids}>
        <Grid container spacing={5} justifyContent="center">
          <Grid item lg={4} sm={6} xs={12}>
            <div className={classes.card}>
              <CustomImage
                src={"/assets/contact-email.png"}
                alt="email us"
                width={60}
                height={60}
              />
              <Typography variant="h4" sx={{ pt: 1 }}>
                {dict.help.mailTitle}
              </Typography>
              <Typography variant="subtitle1" sx={{ pt: 1 }}>
                {dict.help.mailText}
              </Typography>
              <div onClick={handleModal} className={classes.btn}>
                <SecondaryButton text={dict.help.mailButton} />
              </div>
              <Modal open={modal}>
                <ContactForm dict={dict} handleClose={handleModal} />
              </Modal>
            </div>
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <div className={classes.card}>
              <CustomImage
                src={"/assets/contact-twitter.png"}
                alt="twitter logo"
                width={60}
                height={60}
              />
              <Typography variant="h4" sx={{ pt: 1 }}>
                {dict.help.socialTitle}
              </Typography>
              <Typography variant="subtitle1" sx={{ pt: 1 }}>
                {dict.help.socialText}
              </Typography>
              <div className={classes.btn}>
                <SecondaryButton
                  href={process.env.NEXT_PUBLIC_CLIENT_SOCIAL_SUPPORT}
                  text={dict.help.socialButton}
                  target={"_blank"}
                />
              </div>
            </div>
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <div className={classes.card}>
              <CustomImage
                src={"/assets/liveChat.png"}
                alt="live chat"
                width={60}
                height={60}
              />
              <Typography variant="h4" sx={{ pt: 1 }}>
                {dict.help.chatTitle}
              </Typography>
              <Typography variant="subtitle1" sx={{ pt: 1 }}>
                {dict.help.chatText}
              </Typography>
              <div className={classes.btn} onClick={() => openTidioChat()}>
                <SecondaryButton text={dict.help.chatButton} />
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
