// ** Next, React And Locals Imports
import { useRouter } from "next/navigation";
import { createOrderAPI } from "@/actions/orders.actions.js";
import PrimaryButton from "@/components/Button/PrimaryButton";
import theme from "@/components/Theme/theme.js";

// ** Third Party Imports
import axios from "axios";

export default function Razorpay({
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
  const router = useRouter();

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(process.env.NEXT_PUBLIC_RAZORPAY_CHECKOUT_URL);

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "razorpay",
      {
        amount: cartValue,
      }
    );

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: amount.toString(),
      currency: currency,
      name: process.env.NEXT_PUBLIC_SITE_NAME,
      description: process.env.NEXT_PUBLIC_CLIENT_WEBSITE_DESC,
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post(
          process.env.NEXT_PUBLIC_API_URL + "razorpay/success",
          data
        );

        //No error, Creating the order
        if (result?.status === 200) {
          const shippingCost =
            mrp > shippingFeesMinValue ? "FREE" : shippingFees.toString();

          const variables = {
            customer,
            appliedCoupon: coupon?.couponCode || null,
            couponDiscount: coupon?.discount || null,
            paymentMethod: "razorpay",
            paymentStatus: "paid",
            mrp,
            taxes,
            totalAmount: cartValue,
            shippingFees: shippingCost,
            expectedDelivery,
          };

          handleCreateOrder(variables);
        } else {
          window.location.href =
            process.env.NEXT_PUBLIC_CLIENT_URL + "payment/failed";
        }
      },
      prefill: {
        name: customer.name,
        email: customer.email,
        contact: customer.phone,
      },
      notes: {
        pincode: customer.postal_code,
      },
      theme: {
        color: theme.palette.primary.main,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const handleCreateOrder = async (variables) => {
    const response = await createOrderAPI(variables);

    if (response?.status === 200) {
      router.push(`/payment/success/order_id=${response._id}`);
    } else {
      router.push("/payment/failed");
    }
  };

  return (
    <div onClick={displayRazorpay}>
      <PrimaryButton text={dict.checkout.razorpayTitle} />
    </div>
  );
}
