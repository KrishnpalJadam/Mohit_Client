// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      padding: "30px 0",
    },
    spotlightImage: {
      aspectRatio: "16/6",
    },
  };
});

export default useStyles;
