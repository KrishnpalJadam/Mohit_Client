// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      position: "relative",
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "75px 20px",
      [theme.breakpoints.down("md")]: {
        padding: "50px 10px",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "30px 10px 50px",
      },
    },
    title: {
      fontWeight: "bold",
      textTransform: "uppercase",
      marginBottom: "30px",
    },
    slider: {
      "& .slick-list": {
        margin: "0 -15px",
        "& .slick-track": {
          "& .slick-slide > div": {
            margin: "0 15px",
          },
        },
      },
      "&  .slick-dots": {
        "&  li": {
          "&.slick-active > button:before": {
            color: theme.palette.primary.dark,
          },
          "& button": {
            "&:before": {
              color: theme.palette.primary.dark,
              fontSize: "12px",
            },
          },
        },
      },
    },
    prevNextBtn: {
      width: "100%",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      zIndex: "100",
      display: "flex",
      justifyContent: "space-between",
    },
    arrow: {
      width: "50px",
      height: "50px",
      display: "grid",
      placeItems: "center",
      backgroundColor: theme.palette.common.white,
      borderRadius: "99%",
      border: `1px solid ${theme.palette.grey[500]}`,
      cursor: "pointer",
    },
    main: {
      position: "relative",
      aspectRatio: "3/3.5",
      overflow: "hidden",
      borderRadius: "15px",
      border: `10px solid ${theme.palette.primary.light}20`,
    },
    categoryContent: {
      position: "absolute",
      bottom: "0",
      width: "100%",
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
      padding: "15px 10px",
      textAlign: "center",
    },
    categoryText: {
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    action: {
      marginTop: "5px",
      fontWeight: "500",
    },
  };
});

export default useStyles;
