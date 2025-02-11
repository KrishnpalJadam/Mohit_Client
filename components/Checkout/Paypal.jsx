// ** Next, React And Locals Imports
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createOrderAPI } from "@/actions/orders.actions.js";
import useStyles from "./styles.js";

// ** Third Party Imports
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function Paypal({
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
  const classes = useStyles();
  const router = useRouter();

  // States
  const [paid, setPaid] = useState(false);

  // Order details
  const shippingCost =
    mrp > shippingFeesMinValue ? "FREE" : shippingFees.toString();

  const variables = {
    customer,
    appliedCoupon: coupon?.couponCode || null,
    couponDiscount: coupon?.discount || null,
    paymentMethod: "paypal",
    paymentStatus: "paid",
    mrp,
    taxes,
    totalAmount: cartValue,
    shippingFees: shippingCost,
    expectedDelivery,
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
    <div className={classes.paypalBtn}>
      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
          currency: "USD", // Default currency
          intent: "capture",
          disableFunding: "credit,card",
        }}
      >
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: cartValue,
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            await actions.order.capture();

            setPaid(true);

            handleCreateOrder(variables);
          }}
          onError={(err) => {
            router.push("/payment/failed");
          }}
        />
      </PayPalScriptProvider>
      {paid && <div>{dict.checkout.paypalSuccess}</div>}
    </div>
  );
}
