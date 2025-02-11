// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      width: "100vw",
      height: "100vh",
      backgroundImage: `linear-gradient(to bottom, ${
        theme.palette.common.black
      }60, ${theme.palette.common.black}85), url(${"https://i.pinimg.com/736x/b5/3b/f1/b53bf1fd71eeadcf0ac907ec47a933cf.jpg"})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
    },
    form: {
      width: "95%",
      maxWidth: "500px",
      maxHeight: "95%",
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
    actionBtn: {
      marginTop: "25px",
    },
  };
});

export default useStyles;
