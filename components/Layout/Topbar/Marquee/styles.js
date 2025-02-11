// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      backgroundColor: theme.palette.primary.light,
    },
    content: {
      color: theme.palette.common.white,
      padding: "5px 90px",
      "& > p": {
        margin: 0,
      },
      [theme.breakpoints.down("sm")]: {
        padding: "5px 50px",
      },
    },
  };
});

export default useStyles;
