// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    // View order
    orderTop: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "30px",
      "& > h5": {
        [theme.breakpoints.down("sm")]: {
          width: "100%",
        },
      },
      "& > a": {
        [theme.breakpoints.down("sm")]: {
          display: "none",
        },
      },
    },
    viewOrder: {
      padding: "50px",
      [theme.breakpoints.down("lg")]: {
        padding: "20px",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "10px",
      },
    },
    highlight: {
      color: theme.palette.primary.main,
    },
    tabs: {
      width: "100%",
      display: "inline-block",
      marginTop: "25px",
      [theme.breakpoints.down("sm")]: {
        textAlign: "center",
      },
    },
    tab: {
      display: "inline-block",
      margin: "0 25px 25px 0",
      padding: "10px",
      boxShadow: `${theme.palette.grey[300]} 0px 1px 4px`,
      borderRadius: "5px",
    },
    tabHighlight: {
      borderBottom: `5px solid ${theme.palette.primary.main}`,
    },
    productDetails: {
      marginTop: "50px",
    },
    productTab: {
      display: "flex",
      alignItems: "center",
    },
    productImage: {
      marginRight: "20px",
      borderRadius: "5px",
      objectFit: "cover",
      objectPosition: "top center",
    },
    appliedCoupon: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      fontSize: "0.75rem !important",
      margin: "0 5px",
      padding: "3px 5px",
      borderRadius: "3px",
    },
    deliveryDetails: {
      marginTop: "50px",
    },
    otherDetails: {
      marginTop: "50px",
    },
    help: {
      marginTop: "50px",
    },
    // Orders
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
    ordersCtn: {
      flexGrow: 1,
    },
    orders: {
      padding: "30px 50px 50px",
      [theme.breakpoints.down("sm")]: {
        padding: "30px 10px 50px",
      },
    },
    order: {
      padding: "15px",
      marginTop: "30px",
    },
    top: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    product: {
      display: "flex",
      justifyContent: "space-between",
    },
    productImg: {
      marginRight: "20px",
      objectFit: "cover",
      objectPosition: "top center",
    },
    productTitle: {
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
      maxWidth: "350px",
      [theme.breakpoints.down("sm")]: {
        maxWidth: "200px",
      },
    },
    bottom: {
      display: "flex",
      justifyContent: "space-between",
    },
    showMoreBtn: {
      textAlign: "center",
      marginTop: "30px",
    },
    noItems: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "50px 0",
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
    // Add review modal
    modalCtn: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
    },
    modal: {
      width: "600px",
      maxWidth: "90%",
      maxHeight: "90%",
      padding: "20px",
      position: "relative",
      margin: "0 auto",
      overflowY: "auto",
      "&::-webkit-scrollbar": {
        width: "6px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: theme.palette.grey[300],
        borderRadius: "10px",
      },
    },
    closeIcon: {
      position: "absolute",
      top: "10px",
      right: "10px",
      cursor: "pointer",
      backgroundColor: theme.palette.grey[300],
      color: theme.palette.common.white,
      borderRadius: "50%",
      fontSize: "1.4em",
      padding: "2px",
    },
    formField: {
      width: "100%",
      "& .MuiTextField-root": {
        width: "100%",
      },
      "& .MuiFormControl-root": {
        width: "100%",
      },
    },
    dropZoneSingle: {
      width: "100%",
      height: "300px",
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "20px",
      padding: "20px",
      borderRadius: "10px",
      border: `2px dashed ${theme.palette.grey[300]}`,
      cursor: "pointer",
      textAlign: "center",
      overflow: "hidden",
      [theme.breakpoints.down("sm")]: {
        height: "200px",
        padding: "10px",
      },
    },
    previewImgSingle: {
      width: "100%",
      height: "100%",
      "& > img": {
        objectFit: "contain",
      },
    },
    editOverlaySingle: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: "grid",
      placeItems: "center",
      backgroundColor: theme.palette.common.white,
      transition: "0.4s",
      opacity: "0",
      "&:hover": {
        opacity: "1",
      },
    },
    btn: {
      textAlign: "right",
      marginTop: "30px",
    },
    ratingIcon: {
      color: theme.palette.primary.main,
    },
  };
});

export default useStyles;
