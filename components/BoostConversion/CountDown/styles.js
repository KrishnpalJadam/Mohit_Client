// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    countdownCtn: {
      marginTop: "25px",
    },
    countdown: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "12px",
      marginRight: "10px",
      border: `2px solid ${theme.palette.grey[200]}`,
      borderRadius: "5px",
    },
  };
});

export default useStyles;
