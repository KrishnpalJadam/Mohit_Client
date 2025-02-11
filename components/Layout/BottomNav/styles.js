// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      display: "none",
      [theme.breakpoints.down("sm")]: {
        display: "block",
        backgroundColor: theme.palette.common.white,
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: 0,
        paddingBlock: "8px 6px",
        zIndex: 999,
        "& > div:first-child": {
          height: "50px",
        },
      },
    },
    navItem: {
      fontWeight: 500,
      borderRight: `2px solid ${theme.palette.grey[100]}`,
      "& > svg": {
        marginBottom: "5px",
      },
    },
  };
});

export default useStyles;
