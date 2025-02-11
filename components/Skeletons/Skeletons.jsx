"use client";

// ** Next, React And Locals Imports
import theme from "@/components/Theme/theme.js";
import useStyles from "./styles.js";

// ** MUI Imports
import Skeleton from "@mui/material/Skeleton";

export default function Skeletons({ type }) {
  const { classes } = useStyles();

  const Hero = () => (
    <div className={classes.hero}>
      <Skeleton
        sx={{ bgcolor: `${theme.palette.primary.light}25` }}
        variant="rectangular"
        animation="wave"
        width={"100%"}
        height={"100vh"}
      />
    </div>
  );

  const Cart = () => (
    <div className={classes.cart}>
      <Skeleton
        sx={{ bgcolor: `${theme.palette.primary.light}25`, mr: 1 }}
        variant="rounded"
        animation="wave"
        height="100%"
      />
      <div>
        <Skeleton
          animation="wave"
          variant="text"
          width="70%"
          sx={{ bgcolor: `${theme.palette.primary.light}25` }}
        />
        <Skeleton
          animation="wave"
          variant="text"
          width="50%"
          sx={{ bgcolor: `${theme.palette.primary.light}25` }}
        />
        <Skeleton
          animation="wave"
          variant="text"
          width="25%"
          sx={{ bgcolor: `${theme.palette.primary.light}25` }}
        />
        <div className={classes.cartBottom}>
          <Skeleton
            animation="wave"
            variant="text"
            width="30%"
            sx={{ bgcolor: `${theme.palette.primary.light}25` }}
          />
          <Skeleton
            animation="wave"
            variant="text"
            width="25%"
            sx={{ bgcolor: `${theme.palette.primary.light}25` }}
          />
        </div>
      </div>
    </div>
  );

  const ProductCard = () => (
    <>
      <Skeleton
        animation="wave"
        variant="rounded"
        sx={{ bgcolor: `${theme.palette.primary.light}25` }}
        className={classes.productCardImage}
      />
      <Skeleton
        animation="wave"
        variant="text"
        width="100%"
        sx={{ bgcolor: `${theme.palette.primary.light}25` }}
      />
      <Skeleton
        animation="wave"
        variant="text"
        width="70%"
        sx={{ bgcolor: `${theme.palette.primary.light}25` }}
      />
    </>
  );

  if (type === "hero") return <Hero />;
  if (type === "cart") return <Cart />;
  if (type === "card") return <ProductCard />;
}
