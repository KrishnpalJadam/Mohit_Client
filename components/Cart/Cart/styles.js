// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      width: "95%",
      maxWidth: "1000px",
      padding: "40px 20px",
      margin: "0 auto",
    },
    topCta: {
      display: "flex",
      justifyContent: "center",
    },
    progressBar: {
      marginTop: "15px",
      height: "5px",
      borderRadius: "10px",
    },
    products: {
      marginTop: "25px",
    },
    productContainer: {
      borderBottom: `1px solid ${theme.palette.grey[300]}`,
    },
    product: {
      display: "flex",
      justifyContent: "space-between",
      padding: "20px 0",
      position: "relative",
    },
    productContent: {
      display: "flex",
      alignItems: "center",
    },
    productImage: {
      objectFit: "cover",
      objectPosition: "top center",
    },
    quantity: {
      width: "100px",
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      border: `2px solid ${theme.palette.grey[300]}`,
      marginTop: "10px",
      cursor: "pointer",
    },
    productAction: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "flex-end",
    },
    addMore: {
      "& > a": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: `1px solid ${theme.palette.grey[300]}`,
        marginTop: "25px",
        padding: "7px",
        cursor: "pointer",
      },
    },
    pricing: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      marginTop: "35px",
      "& > div": {
        width: "100%",
        maxWidth: "400px",
        display: "flex",
        justifyContent: "space-between",
        padding: "5px 10px",
      },
    },
    totalAmount: {
      marginTop: "15px",
      backgroundColor: theme.palette.grey[50],
    },
    actionBtn: {
      margin: "30px 0px",
      textAlign: "right",
    },
    emptyCart: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    closeIcon: {
      cursor: "pointer",
      opacity: "0.7",
      fontSize: "2em",
    },
  };
});

export default useStyles;
