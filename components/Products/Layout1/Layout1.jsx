"use client";

// ** Next, React And Locals Imports
import Link from "next/link";
import DiscountCalculator from "@/helpers/DiscountCalculator";
import CurrencyConverter from "@/helpers/CurrencyConverter";
import FormatLink from "@/helpers/FormatLink";
import CapitalizeText from "@/helpers/CapitalizeText";
import CustomImage from "@/components/Image/CustomImage";
import Skeletons from "@/components/Skeletons/Skeletons";
import theme from "@/components/Theme/theme.js";
import useStyles from "./styles.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import Skeleton from "@mui/material/Skeleton";

// ** Third Party Imports
import { AiOutlineClose } from "react-icons/ai";

export default function Layout1({
  products,
  title,
  isWishlist,
  loading,
  totalLoadingCount,
}) {
  const { classes } = useStyles();

  // Grid spacing
  const isLarge = useMediaQuery(theme.breakpoints.up("sm"));

  // For skeleton loading
  const skeletonItems = Array.from(
    { length: totalLoadingCount || 4 },
    (_, index) => index
  );

  // To find whether product has colors variant or not
  const displayColorOptions = (variants) => {
    const hexRegex = /^#[0-9A-Fa-f]{6}$/; // Regex pattern for valid hexcode
    const colorHexCodes = new Set();

    variants?.forEach((item) => {
      Object.values(item.attributes).forEach((attribute) => {
        if (attribute?.meta && hexRegex.test(attribute.meta)) {
          colorHexCodes.add(attribute.meta);
        }
      });
    });

    return Array.from(colorHexCodes);
  };

  // Remove from wishlist
  const handleRemove = (productId) => {
    isWishlist(productId);
  };

  return (
    <div className={classes.container}>
      <Typography variant="h4" align="center" className={classes.sectionTitle}>
        {title && (
          <>
            {!loading ? (
              products?.length > 0 && CapitalizeText(title)
            ) : (
              <Skeleton
                animation="wave"
                variant="rounded"
                width="80%"
                sx={{
                  bgcolor: `${theme.palette.primary.light}25`,
                  maxWidth: "300px",
                  margin: "0 auto",
                }}
              />
            )}
          </>
        )}
      </Typography>
      <Grid
        container
        spacing={isLarge ? 4 : 1}
        className={classes.cardContainer}
      >
        {products?.length > 0 &&
          products.map((product, index) => (
            <Grid key={index} item xl={3} lg={3} md={4} sm={4} xs={6}>
              <div className={classes.cardMain}>
                <Link href={`/p/${FormatLink(product.name)}`}>
                  <div className={classes.imageContainer}>
                    <CustomImage
                      src={
                        process.env.NEXT_PUBLIC_BACKEND_URL +
                        "product/" +
                        product.images[0]
                      }
                      alt="products"
                      fill={"true"}
                      style={classes.productImage}
                    />
                    {product.images.length > 1 && (
                      <div className={classes.cardImageHover}>
                        <CustomImage
                          src={
                            process.env.NEXT_PUBLIC_BACKEND_URL +
                            "product/" +
                            product.images[1]
                          }
                          alt="products"
                          fill={"true"}
                          style={classes.productImage}
                        />
                      </div>
                    )}
                  </div>
                </Link>
                {product.salePrice < product.regularPrice && (
                  <span className={classes.discount}>
                    <b>
                      -
                      {DiscountCalculator(
                        product.regularPrice,
                        product.salePrice
                      )}
                      %
                    </b>
                  </span>
                )}
                {isWishlist && (
                  <AiOutlineClose
                    onClick={() => handleRemove(product._id)}
                    className={classes.wishlistIcon}
                  />
                )}
              </div>
              <div className={classes.cardContent}>
                <Typography variant="h6" className={classes.title}>
                  {CapitalizeText(product.name)}
                </Typography>
                <Typography variant="subtitle1" className={classes.price}>
                  {product.salePrice < product.regularPrice ? (
                    <>
                      <span className={classes.regularPrice}>
                        {CurrencyConverter(product.regularPrice)}
                      </span>
                      <span className={classes.salePrice}>
                        {CurrencyConverter(product.salePrice)}
                      </span>
                    </>
                  ) : (
                    <span>{CurrencyConverter(product.regularPrice)}</span>
                  )}
                </Typography>
                {/* Color options */}
                {displayColorOptions(product.variants)?.length > 0 &&
                  displayColorOptions(product.variants)
                    .slice(0, 4)
                    .map((hexCode, index) => (
                      <Link href={`/p/${FormatLink(product.name)}`} key={index}>
                        <span
                          style={{ backgroundColor: hexCode }}
                          className={classes.variant}
                        ></span>
                      </Link>
                    ))}
              </div>
            </Grid>
          ))}
        {loading && (
          <>
            {skeletonItems.map((item) => (
              <Grid key={item} item xl={3} lg={3} md={4} sm={4} xs={6}>
                <Skeletons type="card" />
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </div>
  );
}
