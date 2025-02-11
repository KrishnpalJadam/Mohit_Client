// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      [theme.breakpoints.down("lg")]: {
        width: "100%",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        backgroundColor: theme.palette.common.white,
      },
    },
    mobileMenu: {
      height: "100%",
      paddingTop: "25px",
      overflowY: "scroll",
    },
    menu: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 30px",
      borderBottom: `1px solid ${theme.palette.grey[200]}`,
      [theme.breakpoints.down("sm")]: {
        padding: "20px",
      },
    },
    subMenu: {
      backgroundColor: theme.palette.grey[50],
      fontWeight: 300,
    },
    closeIcon: {
      textAlign: "right",
      marginRight: "15px",
    },
  };
});

export default useStyles;
