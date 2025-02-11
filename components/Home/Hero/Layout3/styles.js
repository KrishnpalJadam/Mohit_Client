// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      position: "relative",
    },
    slider: {
      "&  .slick-dots": {
        bottom: "25px !important",
        "&  li": {
          "&.slick-active > button:before": {
            color: theme.palette.primary.dark,
          },
          "& button": {
            "&:before": {
              color: theme.palette.common.white,
              fontSize: "12px",
            },
          },
        },
      },
    },
    screenRatio: {
      aspectRatio: "16/6",
      [theme.breakpoints.down("md")]: {
        aspectRatio: "4/5",
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
      padding: "0 10px",
    },
    arrow: {
      display: "grid",
      placeItems: "center",
      backgroundColor: `${theme.palette.common.white}50`,
      color: theme.palette.common.black,
      border: `1px solid ${theme.palette.common.black}30`,
      padding: "7px 5px",
      cursor: "pointer",
    },
  };
});

export default useStyles;
