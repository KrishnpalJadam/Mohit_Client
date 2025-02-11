// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      width: "100%",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    },
    mainCtn: {
      width: "90%",
      maxWidth: "600px",
      maxHeight: "90%",
      backgroundColor: theme.palette.common.white,
      border: `2px solid ${theme.palette.grey[100]}`,
      zIndex: "10",
      textAlign: "center",
      padding: "30px 50px 30px",
      overflowY: "auto",
      [theme.breakpoints.down("sm")]: { padding: "20px" },
    },
    imageContainer: {
      width: "100px",
      margin: "0 auto",
      [theme.breakpoints.down("sm")]: {
        width: "70px",
      },
    },
  };
});

export default useStyles;
