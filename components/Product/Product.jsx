"use client";

// ** Next, React And Locals Imports
import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addToCartAPI } from "@/actions/cart.actions";
import { addToWishlistAPI } from "@/actions/customers.actions";
import { getCart } from "@/redux/slices/cart";
import CapitalizeText from "@/helpers/CapitalizeText";
import DiscountCalculator from "@/helpers/DiscountCalculator.js";
import CurrencyConverter from "@/helpers/CurrencyConverter.js";
import GetMatchingVariant from "@/helpers/GetMatchingVariant.js";
import BreadcrumbsBar from "./BreadcrumbsBar";
import FloatingCart from "./FloatingCart";
import Reviews from "./Reviews";
import Share from "./Share";
import ProductGallery from "./ProductGallery";
import Cart from "@/components/Cart/CartModal/CartModal";
import CustomersViews from "@/components/BoostConversion/CustomersViews/CustomersViews";
import SoldInLast from "@/components/BoostConversion/SoldInLast/SoldInLast";
import CountDown from "@/components/BoostConversion/CountDown/CountDown";
import HotStock from "@/components/BoostConversion/HotStock/HotStock";
import Cards from "@/components/Products/Cards";
import Toaster from "@/components/Toaster/Toaster";
import ToastWithBtn from "@/components/Toaster/ToastWithBtn";
import ToastStatus from "@/components/Toaster/ToastStatus";
import PrimaryButton from "@/components/Button/PrimaryButton";
import SecondaryButton from "@/components/Button/SecondaryButton";
import useStyles from "./styles.js";
import theme from "@/components/Theme/theme.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Skeleton from "@mui/material/Skeleton";

// ** Third Party Imports
import { AiOutlineHeart } from "react-icons/ai";
import { BsBoxSeam, BsArrowReturnLeft } from "react-icons/bs";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { HiOutlineShare, HiChevronDown } from "react-icons/hi";

export default function Product({
  dict,
  productData,
  relatedProducts,
  siteSettings,
  productSettings,
  shippingPolicy,
  expectedDelivery,
}) {
  const { classes } = useStyles();
  const dispatch = useDispatch();

  // States
  const [product, setProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [accordion, setAccordion] = useState(false);
  const [share, setShare] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});

  // Floating cart
  const scrollHandler = useCallback(() => {
    const actionBtns = document.getElementById("actionBtns");
    const floatingCart = document.getElementById("floatingCart");
    const turnOffCartTop = document.getElementById("turnOffCart")?.offsetTop;

    const sticky = actionBtns.offsetTop;

    if (window.scrollY > sticky && window.scrollY < turnOffCartTop - 200) {
      floatingCart.classList.add(classes.sticky);
    } else {
      floatingCart.classList.remove(classes.sticky);
    }
  }, [classes.sticky]);

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [scrollHandler]);

  // To handle variants
  useEffect(() => {
    if (productData) {
      const product = GetMatchingVariant(productData, selectedOptions);

      setProduct(product);
    }
  }, [productData, selectedOptions]);

  // To get variant attributes (eg: color, size)
  const getVariantAttributes = (variants) => {
    if (!variants || variants.length === 0) return [];

    const attributes = new Set();
    variants.forEach((variant) => {
      Object.keys(variant.attributes).forEach((attr) => {
        attributes.add(attr);
      });
    });

    return Array.from(attributes);
  };

  // Rating & reviews
  const rating = [];

  if (productData?.reviews) {
    productData.reviews.map((item) => rating.push(item.rating));
  }

  const averageRating = (
    rating?.reduce((a, b) => a + b, 0) / rating.length
  ).toFixed(1);

  const totalRatings = rating.length;

  // To validate color options hex color
  const isValidHexCode = (hex) => {
    return /^#[0-9A-Fa-f]{6}$/.test(hex);
  };

  // Add to cart
  const handleAddToCart = async (productId) => {
    // Check if the product type is variable and if all options are selected
    if (
      product.productType === "variable" &&
      (!product.variantId || !product.variantName)
    ) {
      ToastStatus("Error", "Please select all required options");
      return;
    }

    setCartLoading(true);

    const variables = {
      productId,
      name: product.name,
      images: product.images,
      price: product.salePrice,
      tax: product.tax,
      variantId: product.variantId,
      variantName: product.variantName,
    };

    const response = await addToCartAPI(variables);

    if (response?.status === 200) {
      dispatch(getCart(response));

      setShowCart(true);
    } else if (response?.status === 403) {
      ToastWithBtn(response.message);
    } else {
      ToastStatus("Error", "Error occurred");
    }

    setCartLoading(false);
  };

  // Close cart
  const closeCart = () => {
    setShowCart(false);
  };

  // Social share
  const handleShare = () => {
    setShare(!share);
  };

  // Add to wishlist
  const handleAddToWishlist = async (productId) => {
    const response = await addToWishlistAPI(productId);

    if (response?.status === 200) {
      ToastStatus("Success", response.message);
    } else if (response?.status === 401) {
      ToastWithBtn(response.message);
    } else {
      ToastStatus("Error", "Error occurred");
    }
  };

  return (
    <div>
      <Toaster />
      {showCart && <Cart dict={dict} action={closeCart} />}
      <div className={classes.layout}>
        {/* Floating Cart */}
        <FloatingCart
          dict={dict}
          product={product}
          addToCart={handleAddToCart}
        />
        {/* Left layout */}
        <div className={classes.leftLayout}>
          {/* Breadcrumbs */}
          <BreadcrumbsBar dict={dict} product={product} />
          {/* Social Share */}
          <div className={classes.shareIcon}>
            <HiOutlineShare fontSize={"1.5em"} onClick={handleShare} />
          </div>
          <Share
            dict={dict}
            modal={share}
            product={product}
            handleShare={handleShare}
          />
          {/* Product Gallery */}
          <ProductGallery product={product} />
        </div>
        {/* Right layout */}
        <div className={classes.rightLayout}>
          {/* SoldInLast  */}
          <SoldInLast
            dict={dict}
            product={product}
            siteSettings={siteSettings}
          />
          {/* Title, Rating, Price */}
          <Typography variant="h3" component="h1" className={classes.title}>
            {product ? (
              CapitalizeText(product?.name)
            ) : (
              <Skeleton
                animation="wave"
                variant="rounded"
                width="80%"
                sx={{ bgcolor: `${theme.palette.primary.light}25` }}
              />
            )}
          </Typography>
          {/* Rating */}
          {product ? (
            <>
              {totalRatings > 0 && (
                <div className={classes.ratingContainer}>
                  <Rating
                    value={averageRating}
                    precision={0.5}
                    size="small"
                    readOnly
                    className={classes.rating}
                  />
                  <Typography variant="subtitle2" sx={{ ml: 1 }}>
                    ({totalRatings})
                  </Typography>
                </div>
              )}
            </>
          ) : (
            <Skeleton
              animation="wave"
              width="20%"
              sx={{ bgcolor: `${theme.palette.primary.light}25` }}
            />
          )}
          {/* Price */}
          <Typography variant="h4" className={classes.price}>
            {product ? (
              <>
                {product?.salePrice < product?.regularPrice ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span className={classes.salePrice}>
                      {CurrencyConverter(product.salePrice)}
                    </span>
                    <span className={classes.regularPrice}>
                      {CurrencyConverter(product.regularPrice)}
                    </span>
                    <span className={classes.discount}>
                      (
                      {DiscountCalculator(
                        product.regularPrice,
                        product.salePrice
                      ) +
                        "% " +
                        dict.product.priceOffText}
                      )
                    </span>
                  </div>
                ) : (
                  <span>{CurrencyConverter(product?.salePrice)}</span>
                )}
              </>
            ) : (
              <Skeleton
                animation="wave"
                width="40%"
                sx={{ bgcolor: `${theme.palette.primary.light}25` }}
              />
            )}
          </Typography>
          {/* Hot Stock */}
          <HotStock dict={dict} product={product} siteSettings={siteSettings} />
          {/* Countdown */}
          <CountDown
            dict={dict}
            product={product}
            siteSettings={siteSettings}
          />
          {/* Variants */}
          {product?.productType === "variable" &&
            productData.variants.length > 0 && (
              <div className={classes.variants}>
                {getVariantAttributes(productData.variants)?.map(
                  (attribute) => (
                    <div key={attribute} className={classes.variant}>
                      <Typography
                        variant="subtitle2"
                        className={classes.variantOptionText}
                      >
                        {attribute.toUpperCase()} :
                        <span className={classes.selectedOptionText}>
                          {selectedOptions[attribute] &&
                            ` ${CapitalizeText(selectedOptions[attribute])}`}
                        </span>
                      </Typography>

                      {/* Variant options */}
                      {productData.variants.some(
                        (variant) => variant.attributes[attribute]?.meta
                      ) ? (
                        // Display color pickers if any attribute has a "meta" (hex color)
                        <div className={classes.variantOptions}>
                          {[
                            ...new Map(
                              productData.variants.map((variant) => [
                                variant.attributes[attribute]?.value,
                                variant.attributes[attribute],
                              ])
                            ).values(),
                          ]
                            .filter((option) => isValidHexCode(option.meta))
                            .map((option) => (
                              <div
                                key={option.value}
                                className={`${classes.colorPicker} ${
                                  selectedOptions[attribute] === option.value
                                    ? classes.selectedOption
                                    : ""
                                }`}
                                style={{ backgroundColor: option.meta }}
                                onClick={() =>
                                  setSelectedOptions((prev) => ({
                                    ...prev,
                                    [attribute]: option.value,
                                  }))
                                }
                              />
                            ))}
                        </div>
                      ) : (
                        // Render boxes for other attribute options (e.g., size, material)
                        <div className={classes.variantOptions}>
                          {[
                            ...new Set(
                              productData.variants.map(
                                (variant) =>
                                  variant.attributes[attribute]?.value
                              )
                            ),
                          ].map((option) => (
                            <div
                              key={option}
                              className={`${classes.optionBox} ${
                                selectedOptions[attribute] === option
                                  ? classes.selectedOption
                                  : ""
                              }`}
                              onClick={() =>
                                setSelectedOptions((prev) => ({
                                  ...prev,
                                  [attribute]: option,
                                }))
                              }
                            >
                              {option.toUpperCase()}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            )}
          {/* Action buttons */}
          <div id="actionBtns" className={classes.actionBtns}>
            <div
              onClick={() => product?.stock > 0 && handleAddToCart(product._id)}
            >
              <PrimaryButton
                text={
                  product?.stock > 0
                    ? `${dict.product.addToCartButton} - ${CurrencyConverter(
                        product.salePrice
                      )}`
                    : `${dict.product.outOfStockButton}`
                }
                disabled={product?.stock > 0 ? false : true}
                fullWidth={true}
                animate={product?.stock > 0 ? true : false}
                spinner={cartLoading}
                isLoading={!product}
              />
            </div>
            <div onClick={() => handleAddToWishlist(product?._id)}>
              <SecondaryButton
                text={dict.product.wishlistButton}
                endIcon={<AiOutlineHeart fontSize={"1.5em"} />}
                fullWidth={true}
                isLoading={!product}
              />
            </div>
          </div>
          {/* Customers Views */}
          <CustomersViews
            dict={dict}
            product={product}
            siteSettings={siteSettings}
          />
          {/* Risk Reducers */}
          {product && (
            <div className={classes.riskReducers}>
              {expectedDelivery && (
                <div className={classes.riskReducer}>
                  <BsBoxSeam fontSize={"1.5em"} />
                  <Typography variant="subtitle1" sx={{ pl: 2 }}>
                    {dict.product.riskReducerText1} - {expectedDelivery}
                  </Typography>
                </div>
              )}
              <div className={classes.riskReducer}>
                <VscWorkspaceTrusted fontSize={"1.5em"} />
                <Typography variant="subtitle1" sx={{ pl: 2 }}>
                  {dict.product.riskReducerText2}
                </Typography>
              </div>
              <div className={classes.riskReducer}>
                <BsArrowReturnLeft fontSize={"1.5em"} />
                <Typography variant="subtitle1" sx={{ pl: 2 }}>
                  {dict.product.riskReducerText3}
                </Typography>
              </div>
            </div>
          )}
          {/* Description */}
          <div className={classes.accordion}>
            {product ? (
              <>
                <Accordion
                  expanded={accordion}
                  elevation={0}
                  square={true}
                  onChange={() => setAccordion(!accordion)}
                >
                  <AccordionSummary
                    expandIcon={<HiChevronDown fontSize={"1.5em"} />}
                  >
                    <Typography variant="h5">
                      {dict.product.accordionTitle1}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className={classes.accordionContent}>
                    <Typography
                      variant="subtitle1"
                      dangerouslySetInnerHTML={{
                        __html: product?.description,
                      }}
                    />
                  </AccordionDetails>
                </Accordion>
                {shippingPolicy && (
                  <Accordion elevation={0} square={true}>
                    <AccordionSummary
                      expandIcon={<HiChevronDown fontSize={"1.5em"} />}
                    >
                      <Typography variant="h5">
                        {dict.product.accordionTitle2}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.accordionContent}>
                      <Typography
                        variant="body1"
                        dangerouslySetInnerHTML={{
                          __html:
                            shippingPolicy.pageContent.substring(0, 500) +
                            `<a href="/content/shipping-policy" style=${"text-decoration:none"} target="_blank">...read more</a>`,
                        }}
                      />
                    </AccordionDetails>
                  </Accordion>
                )}
              </>
            ) : (
              <Skeleton
                animation="wave"
                variant="rounded"
                width="100%"
                height="150px"
                sx={{ bgcolor: `${theme.palette.primary.light}25` }}
              />
            )}
          </div>
        </div>
      </div>
      {/* Reviews  & related products*/}
      <div className={classes.bottomContainer}>
        {product && (
          <Reviews
            dict={dict}
            product={productData}
            averageRating={averageRating}
            totalRatings={totalRatings}
          />
        )}
        <Cards
          products={product ? relatedProducts : []}
          productSettings={productSettings}
          title={dict.product.relatedProductsTitle}
          loading={product ? false : true}
          totalLoadingCount={4}
        />
      </div>
    </div>
  );
}
