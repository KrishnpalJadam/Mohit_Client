// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    cookieContainer: {
      width: "90%",
      maxWidth: "300px",
      position: "fixed",
      margin: "0 0 25px 25px",
      padding: "15px",
      backgroundColor: theme.palette.common.white,
      boxShadow:
        "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
      zIndex: "100",
      "&:last-child": {
        textAlign: "end",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "10px",
        margin: "0 0 75px 15px",
        maxWidth: "250px",
      },
    },
    cookieBtn: {
      marginTop: "10px",
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
      padding: "8px 13px",
      border: "0px",
      fontFamily: "Josefin Sans",
      fontSize: "1rem",
      cursor: "pointer",
    },
  };
});

export default useStyles;
