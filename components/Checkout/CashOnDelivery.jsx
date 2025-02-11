// ** Next, React And Locals Imports
import { useRouter } from "next/navigation";
import { createOrderAPI } from "@/actions/orders.actions.js";
import PrimaryButton from "@/components/Button/PrimaryButton";

export default function CashOnDelivery({
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

  // Placing the order
  const placeCodOrder = () => {
    const shippingCost =
      mrp > shippingFeesMinValue ? "FREE" : shippingFees.toString();

    const variables = {
      customer,
      appliedCoupon: coupon?.couponCode || null,
      couponDiscount: coupon?.discount || null,
      paymentMethod: "cod",
      paymentStatus: "unpaid",
      mrp,
      taxes,
      totalAmount: cartValue,
      shippingFees: shippingCost,
      expectedDelivery,
    };

    handleCreateOrder(variables);
  };

  const handleCreateOrder = async (variables) => {
    const response = await createOrderAPI(variables);

    if (response?.status === 200) {
      router.push(`/payment/success/order_id=${response._id}`);
    } else {
      router.push("/payment/failed");
    }
  };

  return (
    <div onClick={placeCodOrder}>
      <PrimaryButton text={dict.checkout.codPlaceOrder} />
    </div>
  );
}
