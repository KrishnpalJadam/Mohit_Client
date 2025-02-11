// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      paddingBlock: "75px",
      [theme.breakpoints.down("sm")]: {
        paddingBlock: "50px",
      },
    },
  };
});

export default useStyles;
