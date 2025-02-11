// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      background: `linear-gradient(to bottom, ${theme.palette.primary.light}, ${theme.palette.primary.dark})`,
      padding: "20px 0",
      userSelect: "none",
    },
    content: {
      color: theme.palette.common.white,
      padding: "6px 90px",
      "& > *": {
        margin: 0,
      },
      [theme.breakpoints.down("sm")]: {
        padding: "7px 50px",
      },
    },
  };
});

export default useStyles;
