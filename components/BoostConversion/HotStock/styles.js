// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    hotStockCtn: {
      width: "100%",
      maxWidth: "300px",
      color: theme.palette.error.main,
      marginTop: "25px",
    },
  };
});

export default useStyles;
