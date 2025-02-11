// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      width: "100%",
      maxWidth: "1000px",
      margin: "0 auto",
      padding: "50px 30px 100px",
      [theme.breakpoints.down("sm")]: {
        padding: "50px 10px 100px",
      },
    },
    mainContainer: {
      width: "100%",
      display: "flex",
      columnGap: "50px",
      marginTop: "30px",
    },
    sidebar: {
      width: "25%",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    main: {
      flexGrow: 1,
    },
    form: {
      padding: "30px 50px 50px",
      [theme.breakpoints.down("sm")]: {
        padding: "30px 20px 50px",
      },
    },
    formField: {
      width: "100%",
      display: "flex",
      justifyContent: "space-around",
      "& .MuiTextField-root": {
        width: "100%",
      },
      [theme.breakpoints.down("sm")]: {
        marginTop: "30px",
      },
    },
    actionBtn: {
      width: "100%",
      marginTop: "30px",
      textAlign: "right",
    },
    prevNext: {
      display: "none",
      "& > h5": {
        display: "flex",
        alignItems: "center",
      },
      [theme.breakpoints.down("md")]: {
        marginTop: "30px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-end",
      },
    },
  };
});

export default useStyles;
