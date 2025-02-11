// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      width: "100%",
      maxWidth: "1000px",
      margin: "0 auto",
      padding: "50px 30px 100px",
      [theme.breakpoints.down("sm")]: {
        padding: "50px 10px 100px",
      },
    },
    mainContainer: {
      width: "100%",
      display: "flex",
      columnGap: "50px",
      marginTop: "30px",
    },
    sidebar: {
      width: "25%",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    main: {
      flexGrow: 1,
    },
    form: {
      padding: "30px 50px 50px",
      [theme.breakpoints.down("sm")]: {
        padding: "30px 20px 50px",
      },
    },
    coupon: {
      padding: "10px",
      marginTop: "30px",
    },
    couponTop: {
      display: "flex",
      justifyContent: "space-between",
      padding: "15px 5px",
      position: "relative",
      "& div": {
        flexGrow: 1,
      },
    },
    couponCode: {
      display: "flex",
      "& b": {
        display: "flex",
        alignItems: "center",
        paddingLeft: "5px",
        "& svg": {
          paddingLeft: "5px",
          cursor: "pointer",
        },
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },
    discountImg: {
      position: "absolute",
      top: "-20px",
      right: "-20px",
    },
    couponBottom: {
      display: "flex",
      justifyContent: "space-between",
      padding: "10px 5px",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        "& > h6:first-child": {
          marginBottom: "5px",
        },
      },
    },
    prevNext: {
      display: "none",
      "& > a > h5": {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
      },
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "30px",
      },
    },
  };
});

export default useStyles;
