// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      borderTop: `1px solid ${theme.palette.grey[200]}`,
    },
    title: {
      padding: "10px 25px",
      "& > h5": {
        display: "inline !important",
        paddingRight: "5px",
      },
    },
    trendingProduct: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "25px 40px",
      transition: "0.3s all ease-in-out",
      cursor: "pointer",
      "&:hover": {
        transform: "translateY(-10px)",
      },
    },
    productImage: {
      borderRadius: "60%",
      objectFit: "cover",
      objectPosition: "top center",
    },
  };
});

export default useStyles;
