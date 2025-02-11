// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      position: "relative",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center center",
      overflow: "hidden",
      marginBottom: "10px",
    },
    screenRatio: {
      aspectRatio: "16/6",
      [theme.breakpoints.down("md")]: {
        aspectRatio: "4/5",
      },
    },
    content: {
      position: "absolute",
      width: "100%",
      bottom: "7%",
      left: "50%",
      transform: "translateX(-50%)",
      textAlign: "center",
      padding: "0 10px",
    },
    heading: {
      textTransform: "uppercase",
      maxWidth: "550px",
      margin: "0 auto 15px",
      color: theme.palette.common.white,
    },
    textShadow: {
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
    },
    countDownContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "25px",
    },
    countDownTimer: {
      display: "flex",
      alignItems: "center",
      color: theme.palette.common.black,
      backgroundColor: theme.palette.common.white,
      margin: "0 7px",
      padding: "10px",
      [theme.breakpoints.down("sm")]: {
        margin: "0 5px",
      },
    },
  };
});

export default useStyles;
