// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      width: "100%",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingInline: "50px",
      position: "relative",
      borderBottom: `1px solid ${theme.palette.grey[200]}`,
      [theme.breakpoints.down("sm")]: {
        paddingInline: "10px",
      },
    },
    hamBurgerMenu: {
      display: "none",
      width: "25%",
      [theme.breakpoints.down("lg")]: {
        display: "flex",
      },
    },
    logoContainer: {
      width: "25%",
      textAlign: "center",
      paddingTop: "10px",
      cursor: "pointer",
      "& > div": {
        maxWidth: "100px",
        margin: "0 auto",
      },
      [theme.breakpoints.down("lg")]: {
        width: "50%",
      },
    },
    categories: {
      width: "50%",
      display: "flex",
      justifyContent: "center",
      [theme.breakpoints.down("lg")]: {
        display: "none",
      },
    },
    category: {
      marginRight: "30px",
      cursor: "pointer",
      textTransform: "capitalize",
      fontWeight: 700,
      "&:hover": {
        color: theme.palette.primary.dark,
        WebkitMaskImage:
          "linear-gradient(-75deg, rgba(0,0,0,.6) 30%, #000 50%, rgba(0,0,0,.6) 70%)",
        WebkitMaskSize: "200%",
        animation: "shine 1.5s infinite",
      },
      "@keyframes shine": {
        from: {
          WebkitMaskPosition: "150%",
        },
        to: {
          WebkitMaskPosition: "-50%",
        },
      },
    },
    essentials: {
      width: "25%",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    icon: {
      display: "flex",
      marginLeft: "20px",
      cursor: "pointer",
      "& > div": {
        display: "flex",
      },
    },
    profileIcon: {
      position: "relative",
      [theme.breakpoints.down("lg")]: {
        display: "none",
      },
    },
    intlIcon: {
      [theme.breakpoints.down("lg")]: {
        display: "none",
      },
    },
    cartIcon: {
      position: "relative",
    },
    cartQuantity: {
      position: "absolute",
      top: "-10px",
      right: "-10px",
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      width: "10px",
      height: "10px",
      padding: "10px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    profileModal: {
      position: "absolute",
      top: "60px",
      right: "-30px",
      zIndex: 100,
    },
  };
});

export default useStyles;
