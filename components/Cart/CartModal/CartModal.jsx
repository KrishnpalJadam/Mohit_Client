"use client";

// ** Next, React And Locals Imports
import { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchCartAPI,
  changeCartQuantityAPI,
  deleteFromCartAPI,
} from "@/actions/cart.actions";
import { fetchShippingAPI } from "@/actions/shipping.actions";
import { getCart } from "@/redux/slices/cart.js";
import { getShipping } from "@/redux/slices/shipping.js";
import CapitalizeText from "@/helpers/CapitalizeText.js";
import CurrencyConverter from "@/helpers/CurrencyConverter.js";
import Toaster from "@/components/Toaster/Toaster";
import ToastStatus from "@/components/Toaster/ToastStatus";
import CustomImage from "@/components/Image/CustomImage";
import PrimaryButton from "@/components/Button/PrimaryButton";
import SecondaryButton from "@/components/Button/SecondaryButton";
import useStyles from "./styles.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

// ** Third Party Imports
import { MdClose } from "react-icons/md";
import { BsCart2 } from "react-icons/bs";

export default function CartModal({ dict, action }) {
  const { classes } = useStyles();
  const dispatch = useDispatch();

  // Fetch cart & shipping data
  useEffect(() => {
    const fetchCartData = async () => {
      const response = await fetchCartAPI();

      if (response) {
        dispatch(getCart(response));
      }
    };

    const fetchShippingData = async () => {
      const response = await fetchShippingAPI();

      if (response) {
        dispatch(getShipping(response));
      }
    };

    fetchCartData();
    fetchShippingData();
  }, []);

  // Cart
  const cart = useSelector((state) => state.cart.cart);

  // Cart calculations
  const cartItems = cart?.products;

  const cartQuantity = [];

  cartItems?.length > 0 &&
    cartItems.map((product) => {
      cartQuantity.push(product.price * product.quantity);
    });

  const cartValue =
    cartQuantity.length > 0 && cartQuantity.reduce((a, b) => a + b);

  // Shipping
  const shipping = useSelector((state) => state.shipping.shipping);
  const shippingFeesMinValue = shipping?.minValue;
  const shippingFees = shipping?.fees;

  // Progress bar
  const progressBarValue = (cartValue / shippingFeesMinValue) * 100;

  // Change quantity
  const handleIncDec = (cartId, productId, variantId, action) => {
    changeQuantity({
      cartId,
      productId,
      variantId,
      action,
    });
  };

  const changeQuantity = async (variables) => {
    const response = await changeCartQuantityAPI(variables);

    if (response?.status === 200) {
      dispatch(getCart(response));
    } else {
      ToastStatus("Error", response.message);
    }
  };

  // Remove product from cart
  const handleRemoveProduct = async (cartId, productId, variantId) => {
    const variables = {
      cartId,
      productId,
      variantId,
    };

    const response = await deleteFromCartAPI(variables);

    if (response?.status === 200) {
      dispatch(getCart(response));
    } else {
      ToastStatus("Error", response.message);
    }
  };

  // Close cart modal
  const closeCart = () => {
    action(false);
  };

  return (
    <div className={classes.container}>
      <Toaster />
      <div className={classes.cartDrawer}>
        {cartItems?.length > 0 ? (
          <div>
            <MdClose onClick={closeCart} className={classes.closeIcon} />
            {cartValue >= shippingFeesMinValue ? (
              <div className={classes.topCta}>
                <Typography variant="subtitle1">
                  {dict.cart.freeShippingTitle}
                </Typography>
                <CustomImage
                  src={"/assets/peace.png"}
                  alt="peace"
                  width={30}
                  height={30}
                />
              </div>
            ) : (
              <>
                <Typography variant="subtitle1" align="center">
                  {dict.cart.progressBarText1}
                  <b>{CurrencyConverter(shippingFeesMinValue - cartValue)}</b>
                  {dict.cart.progressBarText2}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={progressBarValue}
                  className={classes.progressBar}
                />
              </>
            )}
            <div className={classes.products}>
              {cartItems?.map((product, index) => (
                <div key={index} className={classes.productContainer}>
                  <div className={classes.product} key={index}>
                    <div className={classes.productContent}>
                      <CustomImage
                        src={
                          process.env.NEXT_PUBLIC_BACKEND_URL +
                          "product/" +
                          product.images[0]
                        }
                        alt="product"
                        width={80}
                        height={80}
                        style={classes.productImage}
                      />
                      <div style={{ marginLeft: "15px" }}>
                        <Typography variant="subtitle1">
                          {CapitalizeText(product.name)}
                        </Typography>
                        {product.variantId && (
                          <Typography
                            variant="subtitle2"
                            sx={{ mt: 1, fontSize: "11px", opacity: 0.9 }}
                          >
                            {product.variantName?.toUpperCase()}
                          </Typography>
                        )}
                        <div className={classes.quantity}>
                          <span
                            onClick={() =>
                              handleIncDec(
                                cart._id,
                                product.productId,
                                product.variantId,
                                "decrement"
                              )
                            }
                          >
                            -
                          </span>
                          <Typography variant="subtitle1" sx={{ pr: 2, pl: 2 }}>
                            {product.quantity}
                          </Typography>
                          <span
                            onClick={() =>
                              handleIncDec(
                                cart._id,
                                product.productId,
                                product.variantId,
                                "increment"
                              )
                            }
                          >
                            +
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className={classes.productAction}>
                      <span
                        onClick={() =>
                          handleRemoveProduct(
                            cart._id,
                            product.productId,
                            product.variantId
                          )
                        }
                      >
                        <MdClose />
                      </span>
                      <Typography variant="subtitle1">
                        {CurrencyConverter(product.price)}
                      </Typography>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={classes.addMore}>
              <Link href="/profile/wishlist">
                <Typography variant="subtitle1" sx={{ pr: 1 }}>
                  {dict.cart.wishlistText}
                </Typography>
                <CustomImage
                  src={"/assets/smiley.png"}
                  alt="add more from wishlist"
                  width={25}
                  height={25}
                />
              </Link>
            </div>
            <div className={classes.pricing}>
              <div>
                <Typography variant="subtitle1">
                  {dict.cart.pricingMrp}
                </Typography>
                <Typography variant="subtitle1">
                  {CurrencyConverter(cartValue)}
                </Typography>
              </div>
              <div>
                {cartValue > shippingFeesMinValue ? (
                  <>
                    <Typography variant="subtitle1">
                      {dict.cart.shippingText}
                    </Typography>
                    <Typography variant="subtitle1">
                      {dict.cart.shippingFree}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="subtitle1">
                      {dict.cart.shippingText}
                    </Typography>
                    <Typography variant="subtitle1">
                      {CurrencyConverter(shippingFees)}
                    </Typography>
                  </>
                )}
              </div>
              <div className={classes.totalAmount}>
                {cartValue > shippingFeesMinValue ? (
                  <>
                    <Typography variant="subtitle1">
                      {dict.cart.pricingTotal}
                    </Typography>
                    <Typography variant="subtitle1">
                      {CurrencyConverter(cartValue)}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="subtitle1">
                      {dict.cart.pricingTotal}
                    </Typography>
                    <Typography variant="subtitle1">
                      {CurrencyConverter(cartValue + shippingFees)}
                    </Typography>
                  </>
                )}
              </div>
            </div>
            <div className={classes.actionBtn}>
              <PrimaryButton
                href={"/checkout/cart_id_" + cart._id}
                text={dict.cart.checkout}
                fullWidth={true}
                animate={true}
              />
            </div>
            <div className={classes.actionBtn} onClick={() => closeCart()}>
              <SecondaryButton
                href={"/cart"}
                text={dict.cart.viewCart}
                fullWidth={true}
              />
            </div>
          </div>
        ) : (
          <div className={classes.emptyCart}>
            <MdClose onClick={closeCart} className={classes.closeIcon} />
            <Typography variant="subtitle1" align="center" sx={{ pt: 5 }}>
              {dict.cart.emptyText}
            </Typography>
            <div style={{ margin: "40px auto" }}>
              <CustomImage
                src={"/assets/emptyCart.webp"}
                alt="empty cart"
                width={120}
                height={120}
              />
            </div>
            <PrimaryButton
              href="/shop/all"
              text={dict.cart.shopNow}
              endIcon={<BsCart2 />}
              fullWidth={true}
            />
          </div>
        )}
      </div>
    </div>
  );
}
