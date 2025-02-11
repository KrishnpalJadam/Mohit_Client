"use client";

// ** Next, React And Locals Imports
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { checkCouponAPI } from "@/actions/coupons.actions.js";
import CurrencyConverter from "@/helpers/CurrencyConverter";
import CapitalizeText from "@/helpers/CapitalizeText";
import { FormTextField } from "@/helpers/FormFields";
import Address from "@/components/Checkout/Address";
import StripeForm from "@/components/Checkout/StripeForm";
import Paypal from "@/components/Checkout/Paypal";
import Razorpay from "@/components/Checkout/Razorpay";
import CashOnDelivery from "@/components/Checkout/CashOnDelivery";
import ToastStatus from "@/components/Toaster/ToastStatus";
import Toaster from "@/components/Toaster/Toaster";
import CustomImage from "@/components/Image/CustomImage";
import CustomLink from "@/components/Link/CustomLink";
import SecondaryButton from "@/components/Button/SecondaryButton";
import paymentGateways from "@/components/Checkout/Checkout.json";
import theme from "@/components/Theme/theme.js";
import useStyles from "./styles.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

// ** Third Party Imports
import { Form, Field } from "react-final-form";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { HiChevronDown } from "react-icons/hi";
import { CgRadioCheck, CgRadioChecked } from "react-icons/cg";

import CashfreePayment from "./CashfreePay.jsx";

export default function Checkout({
  dict,
  authenticatedCustomerProfile,
  cartData,
  siteSettings,
  shippingFees,
  shippingFeesMinValue,
  expectedDelivery,
}) {
  const { classes } = useStyles();

  // States
  const [customer, setCustomer] = useState(null);
  const [defaultAddress, setDefaultAddress] = useState(true); // Considering as login user initially
  const [cartValue, setCartValue] = useState(null); // Inclusive of mrp, tax & shipping
  const [mrp, setMrp] = useState(null);
  const [taxes, setTaxes] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [accordion1, setAccordion1] = useState(true);
  const [accordion2, setAccordion2] = useState(false);
  const [paypalAccordion, setPaypalAccordion] = useState(false);
  const [cashfreeAccordion, setcashfreeAccordion] = useState(false);
  const [stripeAccordion, setStripeAccordion] = useState(false);
  const [razorpayAccordion, setRazorpayAccordion] = useState(false);
  const [codAccordion, setCodAccordion] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Load stripe
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

  // Cart
  const cartProducts = cartData?.products;

  // Site settings
  const websiteLogo = siteSettings?.websiteLogo;

  const paymentMethods = siteSettings?.paymentMethods;

  // Initial value - Default address - Logged in customer
  const fullname = (firstName, lastName) => {
    if (!firstName && !lastName) {
      return null;
    }
    return [firstName, lastName].filter(Boolean).join(" ");
  };

  const customerConstructor = {
    name: fullname(
      authenticatedCustomerProfile?.firstName,
      authenticatedCustomerProfile?.lastName
    ),
    email: authenticatedCustomerProfile?.email || null,
    phoneNumber: authenticatedCustomerProfile?.phoneNumber || null,
    address: {
      address1: authenticatedCustomerProfile?.address?.address1 || null,
      address2: authenticatedCustomerProfile?.address?.address2 || null,
      city: authenticatedCustomerProfile?.address?.city || null,
      state: authenticatedCustomerProfile?.address?.state || null,
      country: authenticatedCustomerProfile?.address?.country || null,
      postal_code: authenticatedCustomerProfile?.address?.postal_code || null,
    },
  };

  // Separate useEffect for Stripe initialize
  useEffect(() => {
    // Initializing only when Stripe available in paymentMethods & customer is available
    const initializeStripePayment = async () => {
      if (customer && cartValue) {
        if (!paymentMethods?.includes("stripe")) {
          return;
        }

        try {
          const response = await axios.post(
            process.env.NEXT_PUBLIC_API_URL + "stripe",
            {
              amount: cartValue,
              paymentIntentId,
              customer,
            }
          );

          setClientSecret(response?.data?.clientSecret);
          setPaymentIntentId(response?.data?.paymentIntentId);
        } catch (error) {
          // Stripe initialization failed
          ToastStatus("Error", "Stripe is not available, refresh the page!");
        }
      }
    };

    initializeStripePayment();
  }, [cartValue, customer]);

  // Setting logged-in customer data in the state
  useEffect(() => {
    // Removing null values from customerConstructor
    const customerObject = {
      name: customerConstructor.name,
      email: customerConstructor.email || null,
      phoneNumber: customerConstructor.phoneNumber || null,
      address1: customerConstructor.address?.address1 || null,
      address2: customerConstructor.address?.address2 || null,
      city: customerConstructor.address?.city || null,
      state: customerConstructor.address?.state || null,
      country: customerConstructor.address?.country || null,
      postal_code: customerConstructor.address?.postal_code || null,
    };

    Object.keys(customerObject).forEach((key) => {
      if (customerObject[key] === null) {
        delete customerObject[key];
      }
    });

    // Setting default address for logged in customer
    if (customer === null && defaultAddress) {
      if (
        Object.keys(customerObject).length === 9 ||
        (Object.keys(customerObject).length === 8 && !customerObject.address2)
      ) {
        setCustomer(customerConstructor);
      }
    }
  }, [customerConstructor]);

  // Cart calculation
  useEffect(() => {
    let totalQuantity = 0; // Total quantity of products in the cart
    let priceWithoutTax = 0; // Total price of products before taxes (MRP)
    let priceWithDiscount = 0; // Total price after discount, but before taxes
    let productsTax = 0; // Total taxes for all products

    // Calculate total quantity
    cartProducts?.forEach((product) => {
      totalQuantity += product.quantity;
    });

    // Calculate the total cart price before discount
    const totalPrice = cartProducts.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );

    // Iterate through each product to calculate tax, discount, and final price
    cartProducts?.forEach((product) => {
      const productTotal = product.price * product.quantity; // Total price for the current product
      const discount = appliedCoupon ? appliedCoupon.discount : 0; // Total discount applied to the cart

      // Distribute discount proportionally based on product's contribution to the total price
      const discountPerProduct = parseFloat(
        ((productTotal / totalPrice) * discount).toFixed(2)
      );

      // Calculate the product price after discount
      const discountedPrice = parseFloat(
        (product.price - discountPerProduct).toFixed(2)
      );

      // Calculate the tax for the discounted price
      const productTax = parseFloat(
        (discountedPrice * (product.tax / 100) * product.quantity).toFixed(2)
      );

      // Update totals
      productsTax += productTax; // Accumulate total taxes
      priceWithDiscount += discountedPrice * product.quantity; // Accumulate total discounted price
      priceWithoutTax += product.price * product.quantity; // Accumulate total price without taxes
    });

    // Calculate the final cart value, adding shipping fees if necessary
    const cartValue =
      priceWithoutTax > shippingFeesMinValue
        ? priceWithDiscount + productsTax // Free shipping
        : priceWithDiscount + productsTax + shippingFees; // Add shipping fees

    // Update state variables with the final calculated values
    setCartValue(parseFloat(cartValue.toFixed(2))); // Total cart value (price + taxes + shipping if applicable)
    setMrp(parseFloat(priceWithoutTax.toFixed(2))); // Total MRP (price without discounts or taxes)
    setTaxes(parseFloat(productsTax.toFixed(2))); // Total taxes
  }, [cartProducts, appliedCoupon, shippingFees]);

  // Stripe card  appearance
  const appearance = {
    theme: "stripe",
    labels: "floating",
    variables: {
      colorPrimary: theme.palette.primary.light,
      colorBackground: theme.palette.common.white,
      colorText: theme.palette.common.black,
      colorDanger: theme.palette.error.light,
      fontFamily: "Sen, Roboto, Helvetica",
      spacingUnit: "2px",
      borderRadius: "4px",
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  // Scroll to address
  const addressRef = useRef(null);

  const executeScroll = () => {
    addressRef.current.scrollIntoView();
  };

  //  Coupon Submit
  const couponSubmit = (values) => {
    if (!appliedCoupon) {
      const variables = {
        couponCode: values.coupon,
        cartValue,
      };

      checkCoupon(variables);
    } else {
      // Removing the coupon
      setAppliedCoupon(null);
      ToastStatus("Error", "Coupon removed");
    }
  };

  const checkCoupon = async (variables) => {
    const response = await checkCouponAPI(variables);

    if (response?.status === 200) {
      // Applying the discount
      setAppliedCoupon({
        couponCode: response.couponCode,
        discount: response.discount,
      });
      ToastStatus("Success", response.message);
    } else {
      ToastStatus("Emoji", response.message, "😞");
    }
  };

  // Handle default address change
  const handleDefaultAddress = (value) => {
    if (value === false) {
      setCustomer(null);
      setDefaultAddress(value);
    } else {
      setDefaultAddress(value);
    }
  };

  // Handle payment/address accordion (Triggered from address component)
  const handleAccordion = (val1, val2) => {
    setAccordion1(val1);
    setAccordion2(val2);
  };

  // Triggered when customer submitted new address via form
  const handleDiffAddress = (val1, val2, val3) => {
    setCustomer(val1);
    setAccordion1(val2);
    setAccordion2(val3);
  };

  // cashfree order processing
  const handlePlaceOrder = () => {

    console.log("Order placed successfully!");

    // Navigate to the order confirmation page or show order details
    alert("Order cashfree placed successfully!");
  };

  return (
    <div>
      <Toaster />
      <div className={classes.container}>
        <div className={classes.header}>
          {websiteLogo && (
            <Link href="/">
              <CustomImage
                src={
                  process.env.NEXT_PUBLIC_BACKEND_URL + "logos/" + websiteLogo
                }
                alt="website logo"
                width={130}
                height={50}
                className={classes.logo}
              />
            </Link>
          )}
          <div className={classes.trustContainer}>
            <CustomImage
              src={"/assets/lock.png"}
              alt="100% secure"
              width={40}
              height={40}
            />
            <Typography variant="h6" sx={{ pl: 1 }}>
              {dict.checkout.riskReducerText}
            </Typography>
          </div>
        </div>
        <div className={classes.main}>
          <div className={classes.leftLayout}>
            <div ref={addressRef}>
              <Accordion
                expanded={accordion1}
                elevation={0}
                square={true}
                onChange={() => setAccordion1(!accordion1)}
              >
                <AccordionSummary
                  expandIcon={
                    <>
                      {accordion1 ? (
                        <HiChevronDown />
                      ) : (
                        <Typography variant="subtitle1">
                          {dict.checkout.accordion1Edit}
                        </Typography>
                      )}
                    </>
                  }
                  className={classes.accordionSummary}
                >
                  <Typography variant="h5" sx={{ width: "100%" }}>
                    {dict.checkout.accordion1Title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {/* Address Component */}
                  <Address
                    dict={dict}
                    customer={customer}
                    authenticatedCustomerProfile={authenticatedCustomerProfile}
                    defaultAddress={defaultAddress}
                    handleDefaultAddress={handleDefaultAddress}
                    handleAccordion={handleAccordion}
                    handleDiffAddress={handleDiffAddress}
                  />
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={accordion2}
                elevation={0}
                square={true}
                onChange={() => setAccordion2(!accordion2)}
              >
                <AccordionSummary
                  expandIcon={
                    <>
                      {accordion2 ? (
                        <HiChevronDown />
                      ) : (
                        <Typography variant="subtitle1">
                          {dict.checkout.accordion2Edit}
                        </Typography>
                      )}
                    </>
                  }
                  className={classes.accordionSummary}
                >
                  <Typography variant="h5" sx={{ width: "100%" }}>
                    {dict.checkout.accordion2Title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {customer !== null ? (
                    <div>
                      {/* Paypal */}
                      {paymentMethods?.includes("paypal") && (
                        <Accordion
                          expanded={paypalAccordion}
                          onChange={() => {
                            setPaypalAccordion(!paypalAccordion);
                            setStripeAccordion(false);
                            setRazorpayAccordion(false);
                            setCodAccordion(false);
                          }}
                          disableGutters
                        >
                          <AccordionSummary
                            expandIcon={
                              paypalAccordion ? (
                                <CgRadioChecked
                                  color={theme.palette.common.black}
                                />
                              ) : (
                                <CgRadioCheck />
                              )
                            }
                            className={classes.accordionSummary}
                          >
                            <div className={classes.paymentsSummary}>
                              <Typography variant="h6" sx={{ pl: 1 }}>
                                {dict.checkout.paypalTitle}
                              </Typography>
                              <CustomImage
                                src={"/assets/paypal.png"}
                                alt="payment logo"
                                width={80}
                                height={45}
                                style={classes.paypalLogo}
                              />
                            </div>
                          </AccordionSummary>
                          <AccordionDetails>
                            <div className={classes.paypalPayment}>
                              <div className={classes.paypalBtn}>
                                <Paypal
                                  dict={dict}
                                  customer={customer}
                                  cartValue={cartValue}
                                  mrp={mrp}
                                  taxes={taxes}
                                  coupon={appliedCoupon}
                                  shippingFeesMinValue={shippingFeesMinValue}
                                  shippingFees={shippingFees}
                                  expectedDelivery={expectedDelivery}
                                />
                              </div>
                            </div>
                          </AccordionDetails>
                        </Accordion>
                      )}
                      {/* cashfree */}
                      {paymentMethods?.includes("cashfree") && (
                        <Accordion
                          expanded={cashfreeAccordion}
                          onChange={() => {
                            setcashfreeAccordion(!cashfreeAccordion);
                            setPaypalAccordion(false);
                            setStripeAccordion(false);
                            setRazorpayAccordion(false);
                            setCodAccordion(false);
                          }}
                          disableGutters
                        >
                          <AccordionSummary
                            expandIcon={
                              cashfreeAccordion ? (
                                <CgRadioChecked
                                  color={theme.palette.common.black}
                                />
                              ) : (
                                <CgRadioCheck />
                              )
                            }
                            className={classes.accordionSummary}
                          >
                            <div className={classes.paymentsSummary}>
                              <Typography variant="h6" sx={{ pl: 1 }}>
                                {dict.checkout.cashfreeTitle}
                              </Typography>
                              <CustomImage
                                src={"data:image/png;base64,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"}
                                alt="payment logo"
                                width={80}
                                height={45}
                                style={classes.paypalLogo}
                              />
                            </div>
                          </AccordionSummary>
                          <AccordionDetails>
                            <div className={classes.paypalPayment}>
                              <div className={classes.paypalBtn}>
                                {/* <Typography variant="h6">cashfree</Typography> */}
                                {cashfreeAccordion && (
                                  <CashfreePayment
                                    dict={dict}
                                    customer={customer}
                                    cartValue={cartValue}
                                    mrp={mrp}
                                    taxes={taxes}
                                    coupon={appliedCoupon}
                                    shippingFeesMinValue={shippingFeesMinValue}
                                    shippingFees={shippingFees}
                                    expectedDelivery={expectedDelivery}
                                  />
                                )}
                              </div>
                            </div>
                          </AccordionDetails>

                        </Accordion>
                      )}
                      {/* Stripe */}
                      {paymentMethods?.includes("stripe") && (
                        <Accordion
                          expanded={stripeAccordion}
                          onChange={() => {
                            setPaypalAccordion(false);
                            setStripeAccordion(!stripeAccordion);
                            setRazorpayAccordion(false);
                            setCodAccordion(false);
                          }}
                          disableGutters
                        >
                          <AccordionSummary
                            expandIcon={
                              stripeAccordion ? (
                                <CgRadioChecked
                                  color={theme.palette.common.black}
                                />
                              ) : (
                                <CgRadioCheck />
                              )
                            }
                            className={classes.accordionSummary}
                          >
                            <div className={classes.paymentsSummary}>
                              <Typography variant="h6" sx={{ pl: 1 }}>
                                {dict.checkout.stripeTitle}
                              </Typography>
                              <div>
                                {paymentGateways.paymentGateways
                                  .slice(0, 3)
                                  .map((item, index) => {
                                    return (
                                      <div
                                        key={index}
                                        style={{ padding: "0 4px" }}
                                      >
                                        <CustomImage
                                          src={item.paymentGateway}
                                          alt="payment logo"
                                          width={30}
                                          height={30}
                                        />
                                      </div>
                                    );
                                  })}
                                <Typography variant="subtitle2" sx={{ pl: 1 }}>
                                  {dict.checkout.morePaymentOptions}
                                </Typography>
                              </div>
                            </div>
                          </AccordionSummary>
                          <AccordionDetails>
                            <div className={classes.stripePayment}>
                              {clientSecret && (
                                <Elements
                                  options={options}
                                  stripe={stripePromise}
                                >
                                  <StripeForm
                                    dict={dict}
                                    customer={customer}
                                    cartValue={cartValue}
                                    mrp={mrp}
                                    taxes={taxes}
                                    coupon={appliedCoupon}
                                    shippingFeesMinValue={shippingFeesMinValue}
                                    shippingFees={shippingFees}
                                    expectedDelivery={expectedDelivery}
                                  />
                                </Elements>
                              )}
                            </div>
                          </AccordionDetails>
                        </Accordion>
                      )}
                      {/* Razorpay */}
                      {paymentMethods?.includes("razorpay") && (
                        <Accordion
                          expanded={razorpayAccordion}
                          onChange={() => {
                            setPaypalAccordion(false);
                            setStripeAccordion(false);
                            setRazorpayAccordion(!razorpayAccordion);
                            setCodAccordion(false);
                          }}
                          disableGutters
                        >
                          <AccordionSummary
                            expandIcon={
                              razorpayAccordion ? (
                                <CgRadioChecked
                                  color={theme.palette.common.black}
                                />
                              ) : (
                                <CgRadioCheck />
                              )
                            }
                            className={classes.accordionSummary}
                          >
                            <div className={classes.paymentsSummary}>
                              <Typography variant="h6" sx={{ pl: 1 }}>
                                {dict.checkout.razorpayTitle}
                              </Typography>
                              <div>
                                {paymentGateways.paymentGateways
                                  .slice(4)
                                  .map((item, index) => {
                                    return (
                                      <div
                                        key={index}
                                        style={{ padding: "0 4px" }}
                                      >
                                        <CustomImage
                                          src={item.paymentGateway}
                                          alt="payment logo"
                                          width={30}
                                          height={30}
                                        />
                                      </div>
                                    );
                                  })}
                                <Typography variant="subtitle2">
                                  {dict.checkout.morePaymentOptions}
                                </Typography>
                              </div>
                            </div>
                          </AccordionSummary>
                          <AccordionDetails>
                            <div className={classes.razorpayPayment}>
                              <Razorpay
                                dict={dict}
                                customer={customer}
                                cartValue={cartValue}
                                mrp={mrp}
                                taxes={taxes}
                                coupon={appliedCoupon}
                                shippingFeesMinValue={shippingFeesMinValue}
                                shippingFees={shippingFees}
                                expectedDelivery={expectedDelivery}
                              />
                            </div>
                          </AccordionDetails>
                        </Accordion>
                      )}
                      {/* Cash on delivery*/}
                      {paymentMethods?.includes("cod") && (
                        <Accordion
                          expanded={codAccordion}
                          onChange={() => {
                            setPaypalAccordion(false);
                            setStripeAccordion(false);
                            setRazorpayAccordion(false);
                            setCodAccordion(!codAccordion);
                          }}
                          disableGutters
                        >
                          <AccordionSummary
                            expandIcon={
                              codAccordion ? (
                                <CgRadioChecked
                                  color={theme.palette.common.black}
                                />
                              ) : (
                                <CgRadioCheck />
                              )
                            }
                            className={classes.accordionSummary}
                          >
                            <Typography
                              variant="h6"
                              sx={{ pl: 1, pt: 0.5, pb: 0.5 }}
                            >
                              {dict.checkout.codTitle}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <div className={classes.razorpayPayment}>

                              <CashOnDelivery
                                dict={dict}
                                customer={customer}
                                cartValue={cartValue}
                                mrp={mrp}
                                taxes={taxes}
                                coupon={appliedCoupon}
                                shippingFeesMinValue={shippingFeesMinValue}
                                shippingFees={shippingFees}
                                expectedDelivery={expectedDelivery}
                              />
                            </div>
                          </AccordionDetails>
                        </Accordion>
                      )}
                    </div>
                  ) : (
                    <div className={classes.noAddress}>
                      <Typography variant="h6">
                        {dict.checkout.addressEmpty}
                      </Typography>
                      <div
                        className={classes.btn}
                        onClick={() => {
                          setAccordion1(true);
                          setAccordion2(false);
                          executeScroll();
                        }}
                      >
                        <SecondaryButton text={dict.checkout.enterAddress} />
                      </div>
                    </div>
                  )}
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
          <div className={classes.rightLayout}>
            <div>
              <Typography variant="h5" sx={{ pb: 2 }}>
                {dict.checkout.orderSummaryTitle}{" "}
              </Typography>
              {cartProducts?.map((product, index) => (
                <div className={classes.product} key={index}>
                  <div className={classes.productContent}>
                    <div className={classes.productImage}>
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
                      <Typography
                        variant="subtitle1"
                        className={classes.quantity}
                      >
                        {product.quantity}
                      </Typography>
                    </div>
                    <div style={{ marginLeft: "15px" }}>
                      <Typography variant="subtitle1">
                        {CapitalizeText(product.name)}
                      </Typography>
                      {product.variantId && (
                        <Typography
                          variant="subtitle2"
                          sx={{ mt: 1, fontSize: "11px", opacity: 0.9 }}
                        >
                          {product.variantName.toUpperCase()}
                        </Typography>
                      )}
                    </div>
                  </div>
                  <div className={classes.productAction}>
                    <Typography variant="subtitle1">
                      {CurrencyConverter(product.price * product.quantity)}
                    </Typography>
                  </div>
                </div>
              ))}
              <Form
                onSubmit={couponSubmit}
                initialValues={
                  !appliedCoupon && {
                    coupon: "",
                  }
                }
              >
                {({ handleSubmit }) => (
                  <form onSubmit={handleSubmit} className={classes.applyCoupon}>
                    <div className={classes.couponField}>
                      <Field
                        name="coupon"
                        component={FormTextField}
                        placeholder={dict.checkout.couponEnter}
                      />
                    </div>
                    <div>
                      <SecondaryButton
                        type="submit"
                        text={
                          !appliedCoupon
                            ? dict.checkout.couponApply
                            : dict.checkout.couponRemove
                        }
                      />
                    </div>
                  </form>
                )}
              </Form>
              <div className={classes.pricing}>
                <div>
                  <Typography variant="subtitle1">
                    {dict.checkout.pricingMrp}
                  </Typography>
                  <Typography variant="subtitle1">
                    {CurrencyConverter(mrp)}
                  </Typography>
                </div>
                <div>
                  {mrp > shippingFeesMinValue ? (
                    <>
                      <Typography variant="subtitle1">
                        {dict.checkout.shippingText}
                      </Typography>
                      <Typography variant="subtitle1">
                        {dict.checkout.shippingFree}
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography variant="subtitle1">
                        {dict.checkout.shippingText}
                      </Typography>
                      <Typography variant="subtitle1">
                        {CurrencyConverter(shippingFees)}
                      </Typography>
                    </>
                  )}
                </div>
                <div>
                  {appliedCoupon && (
                    <>
                      <Typography variant="subtitle1">
                        {dict.checkout.couponText}{" "}
                        <span className={classes.couponCode}>
                          {appliedCoupon.couponCode}
                        </span>
                      </Typography>
                      <Typography variant="subtitle1">
                        - {CurrencyConverter(appliedCoupon.discount)}
                      </Typography>
                    </>
                  )}
                </div>
                <div>
                  <Typography variant="subtitle1">
                    {dict.checkout.taxesText}
                  </Typography>
                  <Typography variant="subtitle1">
                    {CurrencyConverter(taxes)}
                  </Typography>
                </div>
                <div className={classes.totalAmount}>
                  <Typography variant="h6">
                    {dict.checkout.pricingTotal}
                  </Typography>
                  <Typography variant="h4">
                    {CurrencyConverter(cartValue)}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.footer}>
          <div className={classes.paymentsContainer}>
            {paymentGateways.paymentGateways.map((item, index) => {
              return (
                <div key={index}>
                  <CustomImage
                    src={item.paymentGateway}
                    alt="payment logo"
                    width={30}
                    height={30}
                  />
                </div>
              );
            })}
          </div>
          <CustomLink
            href="/help"
            text={dict.checkout.help}
            color={true}
            hover={true}
          />
        </div>
      </div>
    </div>
  );
}
