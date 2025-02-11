// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "100px 20px 75px",
      [theme.breakpoints.down("md")]: {
        padding: "75px 10px 50px",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "75px 10px 0px",
      },
    },
    title: {
      fontWeight: "bold",
      textTransform: "uppercase",
      marginBottom: "30px",
    },
    subHeroGrid: {
      "&:last-child": {
        [theme.breakpoints.down("md")]: {
          display: "none",
        },
        [theme.breakpoints.down("sm")]: {
          display: "block",
        },
      },
    },
    main: {
      position: "relative",
      aspectRatio: "5/3.5",
      overflow: "hidden",
    },
    subHeroContent: {
      position: "absolute",
      top: "50%",
      left: "25px",
      transform: "translateY(-50%)",
      [theme.breakpoints.down("md")]: {
        left: "15px",
      },
    },
    subHeroText: {
      width: "100%",
      maxWidth: "180px",
      color: theme.palette.common.white,
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    action: {
      marginTop: "15px",
      color: theme.palette.common.white,
      textDecoration: "underline",
      textUnderlineOffset: "5px",
      fontWeight: "500",
      "&:hover": {
        textDecorationColor: theme.palette.primary.light,
      },
    },
  };
});

export default useStyles;
