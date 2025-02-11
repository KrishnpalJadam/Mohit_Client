"use client";

// ** Next, React And Locals Imports
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getCustomer } from "@/redux/slices/customer.js";
import CapitalizeText from "@/helpers/CapitalizeText";
import GreetingsLayout from "@/components/Profile/GreetingsLayout/GreetingsLayout";
import Sidebar from "@/components/Profile/Sidebar/Sidebar";
import AddReview from "@/components/Profile/Orders/AddReview";
import Toaster from "@/components/Toaster/Toaster";
import CustomImage from "@/components/Image/CustomImage";
import PrimaryButton from "@/components/Button/PrimaryButton";
import SecondaryButton from "@/components/Button/SecondaryButton";
import useStyles from "./styles.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";

// ** Third Party Imports
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

export default function AllOrders({ dict, customerData, orders }) {
  const dispatch = useDispatch();
  const { classes } = useStyles();

  // States
  const [orderId, setOrderId] = useState("");
  const [products, setProducts] = useState([]);
  const [reviewModal, setReviewModal] = useState(false);
  const [visibleOrders, setVisibleOrders] = useState([]);
  const ordersToShow = 5; // Default

  useEffect(() => {
    if (customerData) {
      dispatch(getCustomer(customerData));
    }
  }, [customerData]);

  // Customer, customer's orders and orders count
  const customer = useSelector((state) => state.customer.customer);

  useEffect(() => {
    if (orders) {
      const initialOrders = orders.slice(0, ordersToShow);
      setVisibleOrders(initialOrders);
    }
  }, [orders]);

  //Total quantity
  const totalQuantity = (products) => {
    const items = products.map((product) => product.quantity);

    return items.reduce((a, b) => {
      return a + b;
    }, 0);
  };

  // To show more orders on click
  const handleShowMoreOrders = () => {
    const currentlyVisibleOrders = visibleOrders.length;

    const nextOrders = orders.slice(
      currentlyVisibleOrders,
      currentlyVisibleOrders + ordersToShow
    );

    setVisibleOrders([...visibleOrders, ...nextOrders]);
  };

  const showMoreButtonVisible = visibleOrders.length < orders?.length;

  // To add review
  const handleAddReview = (products, orderId) => {
    setOrderId(orderId);
    setProducts(products);
    setReviewModal(!reviewModal);
  };

  return (
    <div className={classes.container}>
      <Toaster />
      <GreetingsLayout dict={dict} customer={customer} />
      <Divider sx={{ mt: 3 }} />
      <div className={classes.mainContainer}>
        <div className={classes.sidebar}>
          <Sidebar dict={dict} />
        </div>
        <div className={classes.ordersCtn}>
          <Paper className={classes.orders}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              {dict.account.ordersTitle}
            </Typography>
            {visibleOrders?.length > 0 ? (
              visibleOrders.map((order) => {
                const product = order.products[0];

                return (
                  <Paper key={order._id} className={classes.order}>
                    <Link href={`/profile/orders/${order._id}`}>
                      <div className={classes.top}>
                        <div className={classes.product}>
                          <CustomImage
                            src={
                              process.env.NEXT_PUBLIC_BACKEND_URL +
                              "product/" +
                              product?.images[0]
                            }
                            alt="product"
                            width={60}
                            height={80}
                            style={classes.productImg}
                          />
                          <div>
                            <Typography
                              variant="h6"
                              className={classes.productTitle}
                            >
                              {CapitalizeText(product?.name)}
                            </Typography>
                            {product.variantId && (
                              <Typography variant="subtitle2">
                                {dict.account.productVariant}:{" "}
                                {CapitalizeText(product.variantName)}
                              </Typography>
                            )}
                            {totalQuantity(order.products) > 1 && (
                              <Typography variant="subtitle1" sx={{ mt: 1 }}>
                                & {totalQuantity(order.products) - 1}{" "}
                                {dict.account.productsMore}
                              </Typography>
                            )}
                          </div>
                        </div>
                        <BsChevronRight fontSize={"0.75em"} />
                      </div>
                    </Link>
                    <Divider sx={{ mt: 1, mb: 1 }} />
                    <div className={classes.bottom}>
                      <Typography variant="subtitle1">
                        <b> {dict.account.orderStatusText}:</b>{" "}
                        {CapitalizeText(order.deliveryStatus)}
                      </Typography>
                      {order.deliveryStatus === "delivered" && (
                        <div
                          onClick={() =>
                            handleAddReview(order.products, order._id)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <Typography variant="subtitle1">
                            {dict.account.ordersWriteReview}
                          </Typography>
                        </div>
                      )}
                    </div>
                  </Paper>
                );
              })
            ) : (
              <div className={classes.noItems}>
                <Typography variant="h4" sx={{ pb: 4 }}>
                  {dict.account.noOrdersText1}
                </Typography>
                <Typography variant="subtitle1" sx={{ pb: 2 }}>
                  {dict.account.noOrdersText2}
                </Typography>
                <PrimaryButton href="/shop/all" text={dict.account.shopNow} />
              </div>
            )}
            {showMoreButtonVisible && (
              <div className={classes.showMoreBtn}>
                <SecondaryButton
                  text={dict.account.productsShowMore}
                  onClick={handleShowMoreOrders}
                />
              </div>
            )}{" "}
          </Paper>
        </div>
      </div>
      {/* Add Review Modal */}
      <Modal open={reviewModal}>
        <AddReview
          dict={dict}
          products={products}
          orderId={orderId}
          closeModal={handleAddReview}
        />
      </Modal>
      <div className={classes.prevNext}>
        <Link href="/profile/address">
          <Typography variant="h5" sx={{ pb: 1 }}>
            <BsChevronLeft fontSize={"0.75em"} />
            {dict.account.prev}
          </Typography>
          <Typography variant="h5">{dict.account.addressTitle}</Typography>
        </Link>
        <Link href="/profile/coupons">
          <Typography variant="h5" sx={{ pb: 1 }}>
            {dict.account.next}
            <BsChevronRight fontSize={"0.75em"} />
          </Typography>
          <Typography variant="h5">{dict.account.couponsTitle}</Typography>
        </Link>
      </div>
    </div>
  );
}
