"use client"; 

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createOrderAPI } from "@/actions/orders.actions.js";
import PrimaryButton from "@/components/Button/PrimaryButton";
import axios from "axios";

export default function CashfreePayment({
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
    const [isSDKLoaded, setSDKLoaded] = useState(false);

    // Load Cashfree SDK only once
    useEffect(() => {
        if (!document.getElementById("cashfree-sdk")) {
            const script = document.createElement("script");
            script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
            script.id = "cashfree-sdk";
            script.onload = () => {
                setSDKLoaded(true);
                console.log("✅ Cashfree SDK Loaded Successfully");
            };
            script.onerror = () => {
                console.error("❌ Cashfree SDK Failed to Load");
                // alert("Payment system is not ready. Please reload the page.");
            };
            document.body.appendChild(script);
        } else {
            setSDKLoaded(true);
        }
    }, []);


    // Create order in the backend
    const handleCreateOrder = async (variables) => {
        try {
            const response = await createOrderAPI(variables);
            if (response?.status === 200) {
                router.push(`/payment/success/order_id=${response._id}`);
            } else {
                router.push("/payment/failed");
            }
        } catch (error) {
            console.error("Order Creation Error:", error);
            router.push("/payment/failed");
        }
    };

    // Initiate Cashfree Payment
    async function createCashfreeOrder() {
        try {
            const orderId = `ORD${Math.floor(Math.random() * 10000000)}`;

            const requestData = {
                orderId,
                orderAmount: cartValue,
                customerName: customer.name,
                orderCurrency:"INR",
                customerPhone: customer.phoneNumber,
                customerId: `CUST${Math.floor(Math.random() * 10000000)}`,
            };

            console.log("Requesting Payment:", requestData);

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}create-order`,
                requestData
            );

            console.log("Full API Response:", response);

            if (response.data) {
                const payment_session_id  = response.data.data;

                // if (!payment_session_id) {
                //     console.error("❌ Missing payment_session_id! Payment cannot proceed.");
                //     alert("Payment failed: Invalid session. Please try again.");
                //     return;
                // }

                console.log("✅ Extracted payment_session_id:", payment_session_id);

                try {
                    
                    const cashfree = new window.Cashfree({ mode: "production" });
                    console.log("✅ Initializing Cashfree Checkout with:", payment_session_id,cashfree);

                    // Ensure the checkout function is properly called
                    await cashfree.checkout({
                        paymentSessionId: payment_session_id,
                        redirectTarget: "_self",
                    });
                    console.log("✅ Cashfree Checkout Started Successfully");
                } catch (error) {
                    console.error("❌ Error in Cashfree Checkout:", error);
                    alert("Something went wrong while starting the payment. Please try again.");
                }

            } else {
                alert("❌ Failed to initiate payment. Please try again.");
            }
        } catch (error) {
            console.error("❌ Payment Error:", error);
            alert("Error processing payment. Please try again.");
        }
    }


    // if (!isSDKLoaded || !window.Cashfree) {
    //     console.error("⚠️ Cashfree SDK not loaded yet. Try again.");
    //     alert("Cashfree payment is not ready. Please wait a few seconds and try again.");
    //     return;
    // }

    return (
        <div onClick={createCashfreeOrder}>
            <PrimaryButton text={dict.checkout.cashfreeTitle || "Pay with Cashfree"} />
        </div>
    );
}
