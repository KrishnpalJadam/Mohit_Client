// ** Next, React And Locals Imports
import useStyles from "./styles.js";
import theme from "@/components/Theme/theme.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Skeleton from "@mui/material/Skeleton";

export default function HotStock({ dict, product, siteSettings }) {
  const { classes } = useStyles();

  const hotStockInventoryLevel = siteSettings?.hotStockInventoryLevel;

  const stocksLeft = product?.stock;

  const hotStock =
    siteSettings?.hotStock &&
    hotStockInventoryLevel > stocksLeft &&
    stocksLeft > 0;

  // Calculating progress value
  const value = () => {
    return 100 - (stocksLeft / hotStockInventoryLevel) * 100;
  };

  return (
    <>
      {product ? (
        <>
          {hotStock && (
            <div className={classes.hotStockCtn}>
              <Typography variant="subtitle1" sx={{ pb: 0.5 }}>
                {dict.product.hotStockText1 +
                  " " +
                  stocksLeft +
                  " " +
                  dict.product.hotStockText2}{" "}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={value()}
                color="error"
              />
            </div>
          )}
        </>
      ) : (
        <div className={classes.hotStockCtn}>
          <Skeleton
            animation="wave"
            variant="rounded"
            width="100%"
            height="70px"
            sx={{
              bgcolor: `${theme.palette.primary.light}25`,
            }}
          />
        </div>
      )}
    </>
  );
}
