// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      paddingBottom: "150px",
    },
    intro: {
      position: "relative",
      backgroundImage: `url(${"/assets/https://i.pinimg.com/736x/b5/3b/f1/b53bf1fd71eeadcf0ac907ec47a933cf.jpg"})`,
      backgroundSize: "cover",
      backgroundPosition: "top center",
      height: "500px",
    },
    introContent: {
      position: "absolute",
      bottom: "0",
      padding: "50px 100px",
      backgroundColor: theme.palette.common.white,
      [theme.breakpoints.down("md")]: {
        padding: "25px 50px",
      },
    },
    reachOut: {
      marginTop: "100px",
      textAlign: "center",
    },
    contactUs: {
      width: "100%",
    },
    grids: {
      width: "80%",
      maxWidth: "1000px",
      margin: "0 auto",
      padding: "50px 20px 0",
    },
    card: {
      textAlign: "center",
      border: `2px solid ${theme.palette.grey[100]}`,
      padding: "20px",
    },
    btn: {
      marginTop: "25px",
    },
    formContainer: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    form: {
      width: "100%",
      maxWidth: "650px",
      maxHeight: "85%",
      padding: "30px 20px",
      margin: "0 10px",
      position: "relative",
      overflowY: "auto",
      "&::-webkit-scrollbar": {
        width: "7px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: theme.palette.grey[200],
        borderRadius: "10px",
      },
    },
    closeIcon: {
      position: "absolute",
      top: "10px",
      right: "10px",
      fontSize: "1.5em",
      backgroundColor: theme.palette.grey[300],
      color: theme.palette.common.white,
      borderRadius: "50%",
      padding: "2px",
      cursor: "pointer",
    },
    formField: {
      width: "100%",
      margin: "20px 0px 10px",
      "& .MuiTextField-root": {
        width: "100%",
      },
    },
    message: {
      width: "100%",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      textAlign: "center",
    },
  };
});

export default useStyles;
