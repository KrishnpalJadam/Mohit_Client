// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    greetings: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    logoutBtn: {
      [theme.breakpoints.down("sm")]: {
        display: "none !important",
      },
    },
  };
});

export default useStyles;
