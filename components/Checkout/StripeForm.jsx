// ** Next, React And Locals Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createOrderAPI } from "@/actions/orders.actions.js";
import CurrencyConverter from "@/helpers/CurrencyConverter.js";
import PrimaryButton from "@/components/Button/PrimaryButton";
import useStyles from "./styles.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";

// ** Third Party Imports
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

export default function StripeForm({
  dict,
  customer,
  cartValue,
  mrp,
  taxes,
  coupon,
  shippingFeesMinValue,
  shippingFees,
  expectedDelivery,
}) {
  const { classes } = useStyles();
  const router = useRouter();

  // Stripe
  const stripe = useStripe();
  const elements = useElements();

  // States
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    // No error, Creating the order
    if (!error) {
      const shippingCost =
        mrp > shippingFeesMinValue ? "FREE" : shippingFees.toString();

      const variables = {
        customer,
        appliedCoupon: coupon?.couponCode || null,
        couponDiscount: coupon?.discount || null,
        paymentMethod: "stripe",
        paymentStatus: "paid",
        mrp,
        taxes,
        totalAmount: cartValue,
        shippingFees: shippingCost,
        expectedDelivery,
      };

      handleCreateOrder(variables);
    } else {
      // Error handling
      if (error?.type === "card_error" || error?.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("Please try again later!");
      }
    }

    setIsLoading(false);
  };

  // Create order
  const handleCreateOrder = async (variables) => {
    const response = await createOrderAPI(variables);

    if (response?.status === 200) {
      router.push(`/payment/success/order_id=${response._id}`);
    } else {
      router.push("/payment/failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement className={classes.paymentElement} />
      <div style={{ textAlign: "center" }}>
        <PrimaryButton
          type={"submit"}
          text={`${
            dict.checkout.stripeText1 +
            " " +
            CurrencyConverter(cartValue) +
            " " +
            dict.checkout.stripeText2
          }`}
          disabled={isLoading || !stripe || !elements}
          spinner={isLoading}
          fullWidth={false}
        />
      </div>
      {/* Show any error or success messages */}
      {message && (
        <div className={classes.paymentMessage}>
          <Typography variant="subtitle2">{message}</Typography>
        </div>
      )}
    </form>
  );
}
