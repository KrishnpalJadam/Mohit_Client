// ** Next, React And Locals Imports
import CurrencyConverter from "@/helpers/CurrencyConverter.js";
import CapitalizeText from "@/helpers/CapitalizeText.js";
import CustomImage from "@/components/Image/CustomImage";
import PrimaryButton from "@/components/Button/PrimaryButton";
import theme from "@/components/Theme/theme.js";
import useStyles from "./styles.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

export default function FloatingCart({ dict, product, addToCart }) {
  const { classes } = useStyles();

  const handleAddToCart = (productId) => {
    addToCart(productId);
  };

  return (
    <div id="floatingCart" className={classes.floatingCartCtn}>
      <div className={classes.floatingCart}>
        <div>
          <Stack direction="row" alignItems={"center"}>
            {product ? (
              <>
                {product.images && (
                  <CustomImage
                    src={
                      process.env.NEXT_PUBLIC_BACKEND_URL +
                      "product/" +
                      product.images[0]
                    }
                    alt="product"
                    width={80}
                    height={80}
                  />
                )}
              </>
            ) : (
              <Skeleton
                animation="wave"
                variant="rounded"
                width="80px"
                height="80px"
                sx={{
                  bgcolor: `${theme.palette.primary.light}25`,
                }}
              />
            )}
            <Typography
              variant="h6"
              sx={{
                pl: 1,
              }}
            >
              {product ? (
                CapitalizeText(product?.name)
              ) : (
                <Skeleton
                  animation="wave"
                  variant="text"
                  width="80%"
                  sx={{
                    bgcolor: `${theme.palette.primary.light}25`,
                    minWidth: "250px",
                  }}
                />
              )}
            </Typography>
          </Stack>
        </div>
        <div onClick={() => product?.stock > 0 && handleAddToCart(product._id)}>
          <PrimaryButton
            disabled={product?.stock > 0 ? false : true}
            text={
              product?.stock > 0
                ? `${dict.product.addToCartButton} - ${CurrencyConverter(
                    product.salePrice
                  )}`
                : `${dict.product.outOfStockButton}`
            }
            fullWidth={true}
            animate={product?.stock > 0 ? true : false}
            style={classes.floatingCartBtn}
            isLoading={!product}
          />
        </div>
      </div>
    </div>
  );
}
