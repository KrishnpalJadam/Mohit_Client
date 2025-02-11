// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    active: {
      color: `${theme.palette.primary.dark}`,
      "& > a > h6": {
        fontWeight: "700 !important",
      },
    },
  };
});

export default useStyles;
