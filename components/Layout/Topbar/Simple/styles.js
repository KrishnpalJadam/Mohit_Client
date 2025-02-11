// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.palette.primary.light,
    },
    content: {
      color: theme.palette.common.white,
      textAlign: "center",
      padding: "5px 15px",
      "& p": {
        margin: 0,
      },
      [theme.breakpoints.down("sm")]: {
        padding: "6px 35px 6px 5px",
      },
    },
    closeIcon: {
      color: theme.palette.common.white,
      position: "absolute",
      right: "10px",
      cursor: "pointer",
    },
  };
});

export default useStyles;
