"use client";

// ** Next, React And Locals Imports
import Products from "@/components/Products/Cards";
import useStyles from "./styles.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";

export default function SearchResults({ dict, products, productSettings }) {
  const { classes } = useStyles();

  return (
    <div>
      {products?.length === 0 && (
        <Typography
          variant="h4"
          align="center"
          sx={{ mt: 5 }}
        >{`${products?.length} ${dict.search.results}`}</Typography>
      )}
      <div className={classes.searchCtn}>
        <Products
          products={products}
          productSettings={productSettings}
          title={`${products?.length} ${dict.search.results}`}
        />
      </div>
    </div>
  );
}
