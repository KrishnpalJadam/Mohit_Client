// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflowX: "hidden",
    },
    confetti: {
      width: "100%",
      height: "100%",
    },
    mainCtn: {
      width: "600px",
      maxWidth: "90%",
      maxHeight: "90%",
      backgroundColor: theme.palette.common.white,
      border: `2px solid ${theme.palette.grey[100]}`,
      zIndex: "10",
      overflowY: "auto",
      textAlign: "center",
      padding: "30px 50px 30px",
      [theme.breakpoints.down("sm")]: { padding: "20px" },
    },
    imageContainer: {
      width: "100px",
      margin: "0 auto",
      [theme.breakpoints.down("sm")]: {
        width: "70px",
      },
    },
    btns: {
      width: "100%",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        flexDirection: "column-reverse",
      },
    },
    actionBtn: {
      width: "100%",
      margin: "0 10px",
      [theme.breakpoints.down("sm")]: {
        margin: "10px 0",
      },
    },
    socialLogo: {
      display: "inline",
      padding: "0 7px",
    },
  };
});

export default useStyles;
