// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      width: "100vw",
      height: "100vh",
      backgroundImage: `linear-gradient(to bottom, ${
        theme.palette.common.black
      }60, ${theme.palette.common.black}85), url(${"/assets/https://i.pinimg.com/736x/b5/3b/f1/b53bf1fd71eeadcf0ac907ec47a933cf.jpg"})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
    },
    paper: {
      width: "97%",
      maxWidth: "450px",
      maxHeight: "97%",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center",
      padding: "20px",
      overflowY: "auto",
      [theme.breakpoints.down("sm")]: {
        padding: "20px 16px",
      },
    },
    formField: {
      width: "100%",
      marginTop: "25px",
      "& .MuiTextField-root": {
        width: "100%",
      },
    },
    verificationCode: {
      marginTop: "25px",
      "& > div": {
        gap: "15px",
        [theme.breakpoints.down("sm")]: {
          gap: "12px",
        },
      },
    },
    actionBtn: {
      marginTop: "25px",
    },
    backToLogin: {
      marginTop: "10px",
      opacity: 0.7,
    },
  };
});

export default useStyles;
