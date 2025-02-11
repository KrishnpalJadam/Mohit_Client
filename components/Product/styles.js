// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    layout: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      columnGap: "20px",
      padding: "50px 0 80px",
      borderBottom: `1px solid ${theme.palette.grey[200]}`,
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        padding: "0 0 50px",
      },
    },
    leftLayout: {
      position: "relative",
      width: "60%",
      padding: "0 20px",
      [theme.breakpoints.down("md")]: {
        width: "100%",
        padding: "0",
      },
    },
    rightLayout: {
      width: "40%",
      padding: "0 20px",
      [theme.breakpoints.up("md")]: {
        position: "sticky",
        top: "20px",
        height: "100%",
      },
      [theme.breakpoints.down("md")]: {
        width: "100%",
        padding: "50px 30px 0",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "40px 10px 0",
      },
    },
    // Breadcrumbs
    breadcrumbs: {
      width: "100%",
      marginTop: "-20px",
      paddingBottom: "20px",
      textTransform: "uppercase",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    // Social share
    shareIcon: {
      display: "flex",
      alignItems: "center",
      position: "absolute",
      top: "40px",
      right: "30px",
      cursor: "pointer",
      zIndex: 100,
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
      border: `1px solid ${theme.palette.common.black}`,
      padding: "8px",
      borderRadius: "99%",
      "& > svg": {
        verticalAlign: "middle",
      },
      [theme.breakpoints.down("md")]: {
        top: "10px",
        right: "20px",
      },
    },
    socialShare: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    socialShareCtn: {
      width: "100%",
      maxWidth: "350px",
      margin: "0 10px",
      backgroundColor: theme.palette.common.white,
      borderBottom: `4px solid ${theme.palette.secondary.main}`,
      outline: "none",
      borderRadius: "7px",
      padding: "15px",
    },
    socialIcons: {
      "& > *": {
        marginRight: "15px",
      },
    },
    closeIcon: {
      width: "100%",
      textAlign: "right",
      cursor: "pointer",
    },
    copyLink: {
      display: "flex",
      alignItems: "center",
      marginTop: "15px",
      cursor: "pointer",
      "& > svg": {
        margin: "0 10px",
      },
    },
    // Gallery & Lightbox
    productGallery: {
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    productImageCtn: {
      overflow: "hidden",
      height: "100%",
    },
    productImage: {
      aspectRatio: "3/3.5",
      transition: "transform 0.7s",
      cursor: "zoom-in",
      "&:hover": {
        transform: "scale(1.2)",
        [theme.breakpoints.down("md")]: {
          transform: "none",
        },
      },
    },
    scrollSnapGallery: {
      overflowX: "auto",
      scrollSnapType: "x mandatory",
      whiteSpace: "nowrap",
      "&::-webkit-scrollbar": {
        height: "4px",
      },
      "&::-webkit-scrollbar-thumb": {
        borderRadius: "4px",
        backgroundColor: theme.palette.grey[200],
      },
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    scrollSnapCtn: {
      display: "inline-block",
      scrollSnapStop: "always",
      scrollSnapAlign: "center",
      marginRight: "10px",
      width: "calc(100% - 50px)",
      [theme.breakpoints.up("sm")]: {
        width: "50%",
      },
    },
    // Floating Cart
    floatingCartCtn: {
      width: "100%",
      position: "fixed",
      bottom: 0,
      visibility: "hidden",
      zIndex: "100",
    },
    floatingCart: {
      width: "95%",
      maxWidth: "1400px",
      margin: "0 auto",
      backgroundColor: theme.palette.common.white,
      boxShadow: "0 0 3px rgba(0, 0, 0, 0.2)",
      borderTopLeftRadius: "7px",
      borderTopRightRadius: "7px",
      transition: ".5s bottom ease-in-out",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      "& > div > div > h6": {
        [theme.breakpoints.down("sm")]: {
          display: "none",
        },
      },
      [theme.breakpoints.down("sm")]: {
        padding: "10px",
      },
    },
    floatingCartBtn: {
      transition: "none !important",
    },
    sticky: {
      visibility: "visible !important",
    },
    // Others
    title: {
      fontWeight: 500,
      marginTop: "20px",
    },
    ratingContainer: {
      marginTop: "5px",
      display: "flex",
      alignItems: "center",
    },
    rating: {
      color: theme.palette.common.black,
    },
    price: {
      marginTop: "20px",
    },
    salePrice: {
      marginRight: "10px",
      fontWeight: 500,
    },
    regularPrice: {
      opacity: "0.5",
      textDecoration: "line-through",
      fontWeight: 400,
    },
    discount: {
      fontSize: "1rem",
      marginLeft: "7px",
      padding: "5px 10px",
      color: theme.palette.error.main,
    },
    variants: {
      marginTop: "35px",
    },
    variant: {
      marginBottom: "20px",
    },
    variantOptionText: {
      marginBottom: "5px",
      fontWeight: "600",
    },
    selectedOptionText: {
      fontWeight: 400,
      color: theme.palette.text.secondary,
      marginLeft: "5px",
    },
    variantOptions: {
      display: "flex",
      gap: "8px",
      marginTop: "10px",
    },
    colorPicker: {
      width: "30px",
      height: "30px",
      borderRadius: 4,
      cursor: "pointer",
      border: `1px solid ${theme.palette.grey[300]}`,
    },
    optionBox: {
      padding: "8px 15px",
      cursor: "pointer",
      border: `2px solid ${theme.palette.grey[300]}`,
      borderRadius: 4,
      textAlign: "center",
      fontWeight: 500,
      transition: "all 0.3s ease",
      "&:hover": {
        border: `2px solid ${theme.palette.primary.main}`,
      },
    },
    selectedOption: {
      border: `2px solid ${theme.palette.primary.main}`,
    },
    actionBtns: {
      width: "100%",
      display: "flex",
      marginTop: "20px",
      gap: "20px",
      [theme.breakpoints.down("lg")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("md")]: {
        flexDirection: "inherit",
        justifyContent: "center",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
      "& > div": {
        width: "50%",
        maxWidth: "400px",
        [theme.breakpoints.down("lg")]: {
          width: "100%",
        },
      },
    },
    riskReducers: {
      marginTop: "20px",
    },
    riskReducer: {
      display: "flex",
      padding: "5px 0",
    },
    accordion: {
      marginTop: "20px",
      "& .MuiAccordion-root": {
        borderBottom: `3px solid ${theme.palette.grey[100]}`,
        "& > div": {
          padding: "0px !important",
        },
      },
    },
    accordionContent: {
      padding: "0px !important",
    },
    // Rating
    bottomContainer: {
      width: "100%",
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "0 10px",
      [theme.breakpoints.down("sm")]: {
        padding: "0 5px",
      },
    },
    reviewsTitle: {
      margin: "40px auto",
      textAlign: "center",
      [theme.breakpoints.down("sm")]: {
        margin: "20px auto",
      },
    },
    averageRating: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "25px 0",
      "& > div": {
        display: "flex",
        alignItems: "center",
      },
    },
    totalReviews: {
      display: "flex",
      alignItems: "center",
      fontSize: "1.5em",
      "& > svg": {
        marginLeft: "10px",
        [theme.breakpoints.down("sm")]: {
          marginLeft: "5px",
        },
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.3em",
      },
    },
    reviewsMasonry: {
      display: "flex",
      justifyContent: "space-evenly",
      width: "100%",
      margin: "auto",
      height: "auto",
    },
    reviewCard: {
      borderRadius: "7px",
      boxShadow: "0 0 3px rgba(0, 0, 0, 0.2)",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: theme.palette.grey[50],
      },
    },
    reviewImage: {
      "& > img": {
        borderTopLeftRadius: "7px",
        borderTopRightRadius: "7px",
      },
    },
    reviewContent: {
      padding: "10px",
      "& > h6:first-child": {
        fontWeight: 800,
      },
    },
    showMoreBtn: {
      width: "100%",
      textAlign: "center",
      marginTop: "20px",
    },
  };
});

export default useStyles;
