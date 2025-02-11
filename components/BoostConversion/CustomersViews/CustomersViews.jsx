// ** Next, React And Locals Imports
import { useState, useEffect } from "react";
import theme from "@/components/Theme/theme.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

// ** Third Party Imports
import { FaRegEye } from "react-icons/fa";

export default function CustomersViews({ dict, product, siteSettings }) {
  // States
  const [count, setCount] = useState(Math.floor(Math.random() * 10) + 1);

  const customerViews = siteSettings?.customerViews;

  const customerViewsNos = siteSettings?.customerViewsNos
    ?.toString()
    .split(",");

  const customerViewsTimer = parseInt(
    siteSettings?.customerViewsTimer?.split("")[0] + "000"
  );

  useEffect(() => {
    if (customerViews) {
      const interval = setInterval(() => {
        const random = Math.floor(Math.random() * customerViewsNos.length);
        setCount(customerViewsNos[random]);
      }, customerViewsTimer);

      return () => clearInterval(interval);
    }
  }, [siteSettings]);

  return (
    <>
      {product ? (
        <>
          {customerViews && (
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                width: "fit-content",
                margin: "15px auto 0",
              }}
              variant="subtitle1"
            >
              <span style={{ display: "flex", paddingRight: "10px" }}>
                <FaRegEye fontSize={"1.3em"} />
              </span>
              {count} {dict.product.customerViewsText}
            </Typography>
          )}
        </>
      ) : (
        <Skeleton
          animation="wave"
          variant="text"
          sx={{
            bgcolor: `${theme.palette.primary.light}25`,
            maxWidth: "350px",
            margin: "20px auto 0",
          }}
        />
      )}
    </>
  );
}
