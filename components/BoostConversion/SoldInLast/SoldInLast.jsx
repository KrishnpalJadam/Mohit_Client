// ** Next, React And Locals Imports
import { useState, useEffect } from "react";
import theme from "@/components/Theme/theme.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

// ** Third Party Imports
import { BsFire } from "react-icons/bs";

export default function SoldInLast({ dict, product, siteSettings }) {
  // States
  const [products, setProducts] = useState(0);
  const [hours, setHours] = useState(0);

  const soldInLast = siteSettings?.soldInLast;

  const soldInLastProducts = siteSettings?.soldInLastProducts
    ?.toString()
    .split(",");

  const soldInLastHours = siteSettings?.soldInLastProducts
    ?.toString()
    .split(",");

  useEffect(() => {
    if (soldInLast) {
      const productsRandom = Math.floor(
        Math.random() * soldInLastProducts.length
      );

      const hoursRandom = Math.floor(Math.random() * soldInLastHours.length);

      setProducts(soldInLastProducts[productsRandom]);
      setHours(soldInLastHours[hoursRandom]);
    }
  }, [siteSettings]);

  return (
    <>
      {product ? (
        <>
          {soldInLast && (
            <div style={{ color: theme.palette.error.main }}>
              <Typography
                sx={{ display: "flex", alignItems: "center" }}
                variant="subtitle1"
              >
                <span style={{ display: "flex", paddingRight: "10px" }}>
                  <BsFire fontSize={"1.3em"} />
                </span>
                {products +
                  " " +
                  dict.product.soldInLastText1 +
                  " " +
                  hours +
                  " " +
                  dict.product.soldInLastText2}
              </Typography>
            </div>
          )}
        </>
      ) : (
        <Skeleton
          animation="wave"
          variant="text"
          sx={{
            bgcolor: `${theme.palette.primary.light}25`,
            maxWidth: "350px",
            marginBottom: "20px",
          }}
        />
      )}
    </>
  );
}
