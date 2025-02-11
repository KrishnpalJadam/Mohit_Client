// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "100px 0",
      [theme.breakpoints.down("md")]: {
        margin: "75px 0",
      },
    },
    sectionTitle: {
      width: "100%",
      marginBottom: "50px",
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    cardContainer: {
      width: "100%",
      maxWidth: "1400px",
    },
    cardMain: {
      position: "relative",
      display: "grid",
    },
    productImage: {
      aspectRatio: "3/3.5",
    },
    trendingIcon: {
      position: "absolute",
      top: "5px",
      right: "5px",
      width: "25px",
      height: "25px",
      [theme.breakpoints.down("sm")]: {
        top: "0px",
        width: "20px",
        height: "20px",
      },
    },
    wishlistIcon: {
      position: "absolute",
      top: "10px",
      right: "10px",
      backgroundColor: theme.palette.common.white,
      borderRadius: "20px",
      fontSize: "1.5em",
      padding: "3px",
      [theme.breakpoints.down("sm")]: {
        top: "10px",
        right: "10px",
        fontSize: "1.2em",
      },
    },
    cardContent: {
      margin: "5px 0 15px",
      textAlign: "center",
      [theme.breakpoints.down("sm")]: {
        padding: "0 5px",
      },
    },
    title: {
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
      [theme.breakpoints.down("sm")]: {
        fontSize: "15px !important",
      },
    },
    price: {
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
    },
    regularPrice: {
      opacity: "0.4",
      textDecoration: "line-through",
      paddingLeft: "7px",
      [theme.breakpoints.down("sm")]: {
        paddingLeft: "3px",
      },
    },
    salePrice: {
      color: theme.palette.error.light,
      fontWeight: 700,
    },
  };
});

export default useStyles;
