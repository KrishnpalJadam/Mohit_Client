// ** Next, React And Locals Imports
import Link from "next/link";
import theme from "@/components/Theme/theme.js";
import useStyles from "./styles.js";

// ** MUI Imports
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";

export default function PrimaryButton({
  href,
  text,
  startIcon,
  endIcon,
  animate,
  type,
  disabled,
  spinner,
  fullWidth,
  style,
  onClick,
  isLoading,
}) {
  const { classes } = useStyles();

  return (
    <>
      {!isLoading ? (
        <>
          {href ? (
            <Link href={href} passHref legacyBehavior>
              <Button
                type={type}
                variant="contained"
                className={`${classes.primaryBtn} ${
                  animate ? classes.shakeBtn : ""
                } ${spinner ? classes.hideText : ""}`}
                disableElevation
                disableRipple
                startIcon={startIcon}
                endIcon={endIcon}
                disabled={disabled}
                fullWidth={fullWidth}
                sx={style}
              >
                <span>{text}</span>
                <span className={spinner ? classes.spinner : ""}></span>
              </Button>
            </Link>
          ) : (
            <Button
              type={type}
              variant="contained"
              className={`${classes.primaryBtn} ${
                animate ? classes.shakeBtn : ""
              } ${spinner ? classes.hideText : ""}`}
              disableElevation
              disableRipple
              startIcon={startIcon}
              endIcon={endIcon}
              disabled={disabled}
              fullWidth={fullWidth}
              sx={style}
              onClick={onClick}
            >
              <span>{text}</span>
              <span className={spinner ? classes.spinner : ""}></span>
            </Button>
          )}
        </>
      ) : (
        <Skeleton
          animation="wave"
          width="100%"
          height="90px"
          sx={{
            bgcolor: `${theme.palette.primary.light}25`,
            minWidth: "200px",
            maxWidth: "350px",
            margin: "0 auto",
          }}
        />
      )}
    </>
  );
}
