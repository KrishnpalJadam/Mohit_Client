// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      backgroundColor: theme.palette.common.white,
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      padding: "30px",
      width: "600px",
      maxWidth: "95%",
      minHeight: "250px",
      outline: "none",
      borderRadius: "7px",
      borderBottom: `5px solid ${theme.palette.primary.main}`,
      "& > div": {
        display: "inline-block",
        textAlign: "center",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "15px",
      },
    },
    closeIcon: {
      position: "absolute",
      top: 15,
      right: 15,
      cursor: "pointer",
    },
    menu: {
      display: "inline-flex",
      alignItems: "center",
      border: `1px solid ${theme.palette.grey[400]}`,
      borderRadius: "5px",
      padding: "10px 15px",
      margin: "7px",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: theme.palette.grey[100],
      },
      [theme.breakpoints.down("sm")]: {
        padding: "7px 12px",
      },
    },
    text: {
      padding: "0 10px",
      fontWeight: "bold",
    },
    switcher: {
      cursor: "pointer",
    },
    activeSwitcher: {
      color: theme.palette.primary.dark,
    },
    activeItem: {
      backgroundColor: theme.palette.common.white,
      border: `2px solid ${theme.palette.primary.main}`,
    },
  };
});

export default useStyles;
