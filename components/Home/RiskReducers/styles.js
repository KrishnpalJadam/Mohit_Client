// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      display: "flex",
      justifyContent: "center",
      padding: "30px 0",
      overflowX: "auto",
      scrollSnapType: "x mandatory",
      borderTop: `1px solid ${theme.palette.grey[200]}`,
      borderBottom: `1px solid ${theme.palette.grey[200]}`,
    },
    reducersContainer: {
      width: "100%",
      maxWidth: "1400px",
      display: "flex",
      flexWrap: "nowrap",
    },
    riskReducer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flex: "0 0 33.33%",
      scrollSnapStop: "always",
      scrollSnapAlign: "center",
      padding: "0 30px",
      [theme.breakpoints.down("md")]: {
        flex: "0 0 65%",
      },
      [theme.breakpoints.down("sm")]: {
        flex: "0 0 100%",
        padding: "0 7px",
      },
    },
    riskReducerImage: {
      width: "90px",
      height: "90px",
      minWidth: "90px",
      backgroundColor: theme.palette.common.black,
      borderRadius: "99%",
      marginRight: "20px",
      display: "grid",
      placeItems: "center",
    },
  };
});

export default useStyles;
