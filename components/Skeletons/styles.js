// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    hero: {
      aspectRatio: "16/5",
      [theme.breakpoints.down("md")]: {
        aspectRatio: "4/5",
      },
    },
    productCardImage: {
      paddingBottom: "116.67%", // 3:3.5 aspect ratio (approximate value)
    },
    cart: {
      display: "grid",
      gridTemplateColumns:
        "minmax(max-content, 120px) minmax(max-content, 100%)", // Add the desired maximum width in pixels
      height: "130px",
      padding: "5px",
      borderRadius: "5px",
      marginTop: "15px",
    },
    cartBottom: {
      display: "flex",
      justifyContent: "space-between",
    },
    reviewCard: {
      backgroundColor: `${theme.palette.grey[50]}`,
      padding: "5px",
      borderRadius: "5px",
    },
  };
});

export default useStyles;
