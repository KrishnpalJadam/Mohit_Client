// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    color: {
      color: theme.palette.primary.dark,
    },
    hover: {
      "&:hover": {
        color: theme.palette.primary.dark,
        textDecoration: "underline",
        textDecorationColor: theme.palette.primary.light,
      },
    },
  };
});

export default useStyles;
