// ** Next, React And Locals Imports
import theme from "@/components/Theme/theme.js";
import useStyles from "./styles.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

// ** Third Party Imports
import Countdown, { zeroPad } from "react-countdown";

export default function CountDown({ dict, product, siteSettings }) {
  const { classes } = useStyles();

  const countdown = siteSettings?.countdown;

  const countdownText = siteSettings?.countdownText;

  const countdownTimer = siteSettings?.countdownTimer;

  const now = new Date().getTime();

  // Countdown time left
  const timeLeft = countdownTimer - now;

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return;
    } else {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className={classes.countdown}>
            <Typography variant="h4">{zeroPad(days)}</Typography>
            <Typography variant="h6">{dict.product.countdownDays}</Typography>
          </div>
          <div className={classes.countdown}>
            <Typography variant="h4">{zeroPad(hours)}</Typography>
            <Typography variant="h6">{dict.product.countdownHours}</Typography>
          </div>
          <div className={classes.countdown}>
            <Typography variant="h4">{zeroPad(minutes)}</Typography>
            <Typography variant="h6">
              {dict.product.countdownMinutes}
            </Typography>
          </div>
          <div className={classes.countdown}>
            <Typography variant="h4">{zeroPad(seconds)}</Typography>
            <Typography variant="h6">
              {dict.product.countdownSeconds}
            </Typography>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      {product ? (
        <>
          {countdown && timeLeft > 1 && (
            <>
              <div className={classes.countdownCtn}>
                {countdownText && (
                  <Typography variant="subtitle1" sx={{ pb: 1 }}>
                    {countdownText}
                  </Typography>
                )}
                <Countdown date={Date.now() + timeLeft} renderer={renderer} />
              </div>
            </>
          )}
        </>
      ) : (
        <div className={classes.countdownCtn}>
          <Skeleton
            animation="wave"
            variant="rounded"
            width="100%"
            height="100px"
            sx={{
              bgcolor: `${theme.palette.primary.light}25`,
              maxWidth: "350px",
            }}
          />
        </div>
      )}
    </>
  );
}
