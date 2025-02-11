// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    searchCtn: {
      margin: "50px 0px",
      "& > div > div": {
        margin: "30px 0px !important",
      },
    },
  };
});

export default useStyles;
