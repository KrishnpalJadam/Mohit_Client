// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    header: {
      width: "100%",
      height: "70px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: `2px solid ${theme.palette.grey[200]}`,
      padding: "0 50px",
      [theme.breakpoints.down("sm")]: {
        padding: "0 15px",
      },
    },
    logo: {
      display: "flex",
      objectFit: "contain",
    },
    trustContainer: {
      display: "flex",
      alignItems: "center",
    },
    main: {
      width: "100%",
      maxWidth: "1300px",
      display: "flex",
      padding: "30px 0 150px",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column-reverse",
        alignItems: "center",
      },
    },
    leftLayout: {
      width: "55%",
      maxWidth: "700px",
      padding: "0 20px",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "0",
      },
    },
    rightLayout: {
      width: "45%",
      maxWidth: "700px",
      "& > div": {
        borderLeft: `2px solid ${theme.palette.grey[200]}`,
        padding: "0 20px",
        [theme.breakpoints.down("md")]: {
          borderLeft: "0",
          marginBottom: "50px",
        },
      },
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },
    addressDetails: {
      padding: "40px 20px",
      [theme.breakpoints.down("sm")]: {
        padding: "40px 10px",
      },
    },
    formField: {
      marginBottom: "35px",
      "& .MuiTextField-root": {
        width: "100%",
        outlineColor: theme.palette.common.black,
      },
    },
    btn: {
      marginTop: "30px",
    },
    accordionSummary: {
      padding: "0 20px",
      [theme.breakpoints.down("sm")]: {
        padding: "0 15px",
      },
    },
    paymentsSummary: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      "& div": {
        display: "flex",
        alignItems: "center",
      },
    },
    paypalPayment: {
      width: "100%",
      padding: "25px 0",
      display: "flex",
      justifyContent: "center",
    },
    paypalLogo: {
      objectFit: "contain",
    },
    paypalBtn: {
      width: "100%",
      maxWidth: "300px",
      // Selecting last button only
      "& > div > .paypal-buttons:not(:last-child)": {
        display: "none !important",
      },
    },
    stripePayment: {
      width: "100%",
      padding: "25px 0",
    },
    paymentElement: {
      marginBottom: "25px",
    },
    paymentMessage: {
      marginTop: "12px",
      textAlign: "center",
    },
    razorpayPayment: {
      width: "100%",
      padding: "25px 0",
      display: "flex",
      justifyContent: "center",
    },
    noAddress: {
      padding: "50px",
      textAlign: "center",
      border: `2px dashed ${theme.palette.grey[200]}`,
      [theme.breakpoints.down("sm")]: {
        padding: "25px",
      },
    },
    product: {
      display: "flex",
      justifyContent: "space-between",
      padding: "20px 0",
      position: "relative",
      borderBottom: `1px solid ${theme.palette.grey[200]}`,
    },
    productContent: {
      display: "flex",
      alignItems: "start",
    },
    productImage: {
      position: "relative",
      "& > img": {
        objectFit: "cover",
        objectPosition: "top center",
        borderRadius: "5px",
      },
    },
    quantity: {
      position: "absolute",
      top: "-10px",
      right: "-10px",
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      borderRadius: "15px",
      width: "1.3rem",
      height: "1.3rem",
      lineHeight: "1.3rem",
      display: "flex",
      justifyContent: "center",
    },
    productAction: {
      display: "flex",
      alignItems: "end",
      marginRight: "20px",
    },
    applyCoupon: {
      display: "flex",
      alignItems: "center",
      height: "50px",
      margin: "30px 0",
    },
    couponField: {
      flexGrow: 1,
      "& .MuiTextField-root": {
        width: "90%",
        outlineColor: theme.palette.common.black,
        "& div": {
          borderRadius: 0,
          height: "50px",
        },
      },
    },
    pricing: {
      padding: "35px 0 0",
      "& > div": {
        display: "flex",
        justifyContent: "space-between",
        padding: "5px 10px",
      },
    },
    totalAmount: {
      marginTop: "15px",
      backgroundColor: theme.palette.grey[50],
    },
    couponCode: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      borderRadius: "5px",
      padding: "5px",
    },
    footer: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderTop: `2px solid ${theme.palette.grey[200]}`,
      paddingTop: "10px",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column-reverse",
        rowGap: "10px",
      },
    },
    paymentsContainer: {
      display: "flex",
      justifyContent: "center",
      padding: "10px 50px",
      "& > div": {
        padding: "0 10px",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "10px 20px",
      },
    },
  };
});

export default useStyles;
