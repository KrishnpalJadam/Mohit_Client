// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    intro: {
      width: "100%",
      height: "40vh",
      maxHeight: "400px",
      backgroundImage: `url(${"/assets/bg2.png"})`,
      backgroundSize: "cover",
      backgroundPosition: "top center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
    },
    content: {
      width: "100%",
      maxWidth: "450px",
      padding: "30px",
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
      [theme.breakpoints.down("sm")]: {
        maxWidth: "300px",
        padding: "20px",
      },
    },
    sortingCtn: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "70px",
      padding: "0px 30px",
      borderTop: `2px solid ${theme.palette.grey[200]}`,
      borderBottom: `2px solid ${theme.palette.grey[100]}`,
      [theme.breakpoints.down("sm")]: {
        padding: "0px 20px",
      },
      "& > div": {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        width: "100%",
      },
    },
    sortBy: {
      width: "100%",
      maxWidth: "250px",
      [theme.breakpoints.down("sm")]: {
        maxWidth: "180px",
      },
    },
    sortText: {
      fontWeight: 500,
    },
    productsContainer: {
      "& > div:last-child > div > div": {
        margin: "0 !important",
      },
      [theme.breakpoints.up("md")]: {
        display: "grid",
        gridTemplateColumns: "25% 75%",
      },
    },
    filtersPanel: {
      padding: "25px 0 15px",
      borderRight: `1px solid ${theme.palette.grey[200]}`,
      height: "auto",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    filterMenu: {
      [theme.breakpoints.down("md")]: {
        display: "block",
        padding: "25px 0 15px",
        borderRight: `1px solid ${theme.palette.grey[200]}`,
        height: "auto",
        position: "fixed",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: theme.palette.common.white,
        zIndex: 1000,
      },
    },
    filterIcon: {
      fontSize: "1.75em",
      marginLeft: "10px",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    filtersPanelTop: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "15px",
      padding: "0 15px",
      "& > h6:first-child": {
        textTransform: "uppercase",
        fontWeight: 600,
      },
      "& > h6:last-child": {
        color: theme.palette.error.main,
        fontWeight: 500,
        cursor: "pointer",
      },
    },
    accordion: {
      borderBottom: `1px solid ${theme.palette.grey[200]}`,
      marginBottom: 0,
      boxShadow: "none",
    },
    filtersPanelAction: {
      display: "flex",
      position: "absolute",
      bottom: 0,
      width: "100%",
      "& > h6": {
        width: "100%",
        textAlign: "center",
        padding: "15px",
        borderTop: `1px solid ${theme.palette.grey[100]}`,
        fontWeight: 500,
        cursor: "pointer",
      },
      "& > h6:first-child": {
        borderRight: `1px solid ${theme.palette.grey[100]}`,
      },
      "& > h6:last-child": {
        color: theme.palette.error.main,
      },
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  };
});

export default useStyles;
