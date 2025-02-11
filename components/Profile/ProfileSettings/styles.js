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
    desktopDatePicker: {
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    mobileDatePicker: {
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    dropzoneField: {
      padding: "20px",
      marginBottom: "40px",
      border: `2px solid ${theme.palette.grey[200]}`,
      "& div": {
        "& div": {
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        },
      },
    },
    dropZoneSingle: {
      width: "100px",
      height: "100px",
      position: "relative",
      cursor: "pointer",
      [theme.breakpoints.down("sm")]: {
        width: "70px",
        height: "70px",
      },
    },
    uploadContainerSingle: {
      width: "100px",
      height: "100px",
    },
    imageContainer: {
      "& > img": {
        borderRadius: "50%",
      },
    },
    editOverlaySingle: {
      position: "absolute",
      width: "100%",
      height: "100%",
      backgroundColor: theme.palette.common.white,
      transition: "0.4s",
      opacity: "0",
      "&:hover": {
        opacity: "0.9",
      },
    },
    changeProfileBtn: {
      [theme.breakpoints.down("sm")]: {
        display: "none !important",
      },
    },
    actionBtn: {
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
