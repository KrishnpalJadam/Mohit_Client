// ** Next, React And Locals Imports
import Link from "next/link";
import theme from "@/components/Theme/theme.js";
import useStyles from "./styles.js";

// ** MUI Imports
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";

export default function SecondaryButton({
  type,
  href,
  text,
  startIcon,
  endIcon,
  fullWidth,
  target,
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
            <Link
              href={href}
              target={target ? target : "_self"}
              passHref
              legacyBehavior
            >
              <Button
                type={type}
                variant="outlined"
                className={classes.secondaryBtn}
                disableElevation
                disableRipple
                startIcon={startIcon}
                endIcon={endIcon}
                fullWidth={fullWidth}
                sx={style}
              >
                {text}
              </Button>
            </Link>
          ) : (
            <Button
              type={type}
              variant="outlined"
              className={classes.secondaryBtn}
              disableElevation
              disableRipple
              startIcon={startIcon}
              endIcon={endIcon}
              fullWidth={fullWidth}
              sx={style}
              onClick={onClick}
            >
              {text}
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
            minWidth: "150px",
            maxWidth: "350px",
            margin: "0 auto",
          }}
        />
      )}
    </>
  );
}
