// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "0px 50px",
      maxWidth: "1400px",
      margin: "0 auto",
      [theme.breakpoints.down("md")]: {
        padding: "0px 15px",
      },
    },
    topLayout: {
      width: "100%",
      display: "flex",
      padding: "75px 0",
      borderTop: `1px solid ${theme.palette.grey[200]}`,
      [theme.breakpoints.down("md")]: {
        flexFlow: "row wrap",
        padding: "50px 0",
      },
    },
    column1: {
      width: "25%",
      [theme.breakpoints.down("md")]: {
        flexBasis: "50%",
      },
      [theme.breakpoints.down("sm")]: {
        paddingBottom: "15px",
      },
    },
    column2: {
      width: "25%",
      "& > div:first-child": {
        [theme.breakpoints.down("sm")]: {
          display: "none",
        },
      },
      [theme.breakpoints.down("md")]: {
        flexBasis: "50%",
      },
      [theme.breakpoints.down("sm")]: {
        flexBasis: "100%",
      },
    },
    column3: {
      width: "25%",
      "& > div:first-child": {
        [theme.breakpoints.down("sm")]: {
          display: "none",
        },
      },
      [theme.breakpoints.down("md")]: {
        flexBasis: "50%",
      },
      [theme.breakpoints.down("sm")]: {
        flexBasis: "100%",
      },
    },
    column4: {
      width: "25%",
      [theme.breakpoints.down("md")]: {
        flexBasis: "50%",
      },
      [theme.breakpoints.down("sm")]: {
        flexBasis: "100%",
        paddingBottom: "30px",
        marginTop: "50px",
      },
    },
    accordion: {
      "& .MuiAccordion-root": {
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
        "& > div:first-child": {
          padding: "5px !important",
        },
      },
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    menuItem: {
      fontWeight: 300,
      [theme.breakpoints.up("sm")]: {
        marginBottom: "10px",
      },
    },
    bottomLayout: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderTop: `1px solid ${theme.palette.grey[200]}`,
      padding: "10px 0",
      textAlign: "center",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
      },
    },
    copyrights: {
      [theme.breakpoints.down("md")]: {
        padding: "10px 0",
      },
    },
    paymentLabels: {
      "& > div": {
        display: "inline",
        padding: "0 15px",
      },
      [theme.breakpoints.down("md")]: {
        padding: "10px 0",
      },
    },
  };
});

export default useStyles;
