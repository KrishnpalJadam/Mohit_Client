// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      position: "relative",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center center",
      overflow: "hidden",
      marginBottom: "10px",
    },
    screenRatio: {
      aspectRatio: "16/6",
      [theme.breakpoints.down("md")]: {
        aspectRatio: "4/5",
      },
    },
  };
});

export default useStyles;
