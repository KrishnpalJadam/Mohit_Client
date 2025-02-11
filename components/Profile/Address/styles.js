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
    formFields: {
      width: "100%",
      display: "flex",
      marginTop: "30px",
      columnGap: "20px",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        marginTop: "0",
      },
    },
    formField: {
      width: "100%",
      display: "flex",
      justifyContent: "space-around",
      "& .MuiTextField-root": {
        width: "100%",
      },
      "& .MuiFormControl-root": {
        width: "100%",
      },
      [theme.breakpoints.down("sm")]: {
        marginTop: "30px",
      },
    },
    actionBtn: {
      marginTop: "30px",
      textAlign: "right",
    },
    prevNext: {
      display: "none",
      "& > a > h5": {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
      },
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "30px",
      },
    },
  };
});

export default useStyles;
