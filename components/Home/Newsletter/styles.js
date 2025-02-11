// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      padding: "60px 30px",
      backgroundColor: `${theme.palette.primary.light}10`,
      [theme.breakpoints.down("sm")]: {
        padding: "40px 15px",
      },
    },
    main: {
      maxWidth: "800px",
      textAlign: "center",
      margin: "0 auto",
    },
    formField: {
      width: "100%",
      "& .MuiTextField-root": {
        width: "75%",
        [theme.breakpoints.down("sm")]: {
          width: "100%",
        },
      },
    },
    actionBtn: {
      width: "75%",
      margin: "20px auto 0",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
  };
});

export default useStyles;
