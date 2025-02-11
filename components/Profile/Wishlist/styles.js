// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      width: "100%",
      padding: "50px",
      [theme.breakpoints.down("sm")]: {
        padding: "50px 10px",
      },
    },
    products: {
      "& > div > div": {
        margin: "0 !important",
      },
    },
    noItems: {
      width: "100%",
      maxWidth: "500px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: "60vh",
      margin: "0 auto",
      textAlign: "center",
    },
  };
});

export default useStyles;
