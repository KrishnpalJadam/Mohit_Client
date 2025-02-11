// ** Next, React And Locals Imports
import Link from "next/link";
import theme from "@/components/Theme/theme";
import useStyles from "./styles";

// ** MUI Imports
import Typography from "@mui/material/Typography";

// ** Third Party Imports
import Countdown, { zeroPad } from "react-countdown";

export default function Layout2({ dict, sliderImages, settings }) {
  const { classes } = useStyles();

  // Countdown timer
  const countDownTimer = settings?.heroCountdown;
  const now = new Date().getTime();
  const timeLeft = countDownTimer - now;

  const OnCounterComplete = () => <span>{dict.home.heroCountdownEnds}</span>;

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <OnCounterComplete />;
    } else {
      // Render a countdown
      return (
        <div className={classes.countDownContainer}>
          <div className={classes.countDownTimer}>
            <Typography variant="h1" component="h2">
              {zeroPad(days)}
            </Typography>
            <Typography variant="h4" sx={{ pl: 1 }}>
              D
            </Typography>
          </div>
          <div className={classes.countDownTimer}>
            <Typography variant="h1" component="h2">
              {zeroPad(hours)}
            </Typography>
            <Typography variant="h4" sx={{ pl: 1 }}>
              H
            </Typography>
          </div>
          <div className={classes.countDownTimer}>
            <Typography variant="h1" component="h2">
              {zeroPad(minutes)}
            </Typography>
            <Typography variant="h4" sx={{ pl: 1 }}>
              M
            </Typography>
          </div>
          <div className={classes.countDownTimer}>
            <Typography variant="h1" component="h2">
              {zeroPad(seconds)}
            </Typography>
            <Typography variant="h4" sx={{ pl: 1 }}>
              S
            </Typography>
          </div>
        </div>
      );
    }
  };

  return (
    <div
      className={`${classes.container} ${classes.screenRatio}`}
      style={{
        backgroundImage: `url(
            ${
              process.env.NEXT_PUBLIC_BACKEND_URL + "uploads/" + sliderImages[0]
            })`,
      }}
    >
      <div className={classes.content}>
        {countDownTimer && (
          <>
            <Typography
              variant="h3"
              component="h1"
              className={`${classes.heading} ${classes.textShadow}`}
            >
              {settings?.heroCountdownText}
            </Typography>
            <Countdown date={Date.now() + timeLeft} renderer={renderer} />
          </>
        )}
        {settings?.heroLink && (
          <Link href={settings.heroLink}>
            <Typography
              variant="subtitle1"
              className={classes.textShadow}
              sx={{
                color: theme.palette.common.white,
              }}
            >
              <b>{settings?.heroBtnText?.toUpperCase()}</b>
            </Typography>
          </Link>
        )}
      </div>
    </div>
  );
}
