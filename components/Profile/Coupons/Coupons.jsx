"use client";

// ** Next, React And Locals Imports
import { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getCustomer } from "@/redux/slices/customer.js";
import CurrencyConverter from "@/helpers/CurrencyConverter.js";
import Sidebar from "@/components/Profile/Sidebar/Sidebar";
import GreetingsLayout from "@/components/Profile/GreetingsLayout/GreetingsLayout";
import Toaster from "@/components/Toaster/Toaster";
import ToastStatus from "@/components/Toaster/ToastStatus";
import CustomImage from "@/components/Image/CustomImage";
import useStyles from "./styles.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

// ** Third Party Imports
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FiCopy } from "react-icons/fi";

export default function Coupons({ dict, customerData, coupons }) {
  const dispatch = useDispatch();
  const { classes } = useStyles();

  useEffect(() => {
    if (customerData) {
      dispatch(getCustomer(customerData));
    }
  }, [customerData]);

  const customer = useSelector((state) => state.customer.customer);

  // Available coupons
  const availableCoupons = coupons?.filter((coupon) => {
    return coupon.isEnabled;
  });

  return (
    <div className={classes.container}>
      <Toaster />
      <GreetingsLayout dict={dict} customer={customer} />
      <Divider sx={{ mt: 3 }} />
      <div className={classes.mainContainer}>
        <div className={classes.sidebar}>
          <Sidebar dict={dict} />
        </div>
        <div className={classes.main}>
          <Paper className={classes.form}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              {dict.account.couponsTitle}
            </Typography>
            {availableCoupons?.map((coupon) => (
              <Paper key={coupon._id} className={classes.coupon}>
                <div className={classes.couponTop}>
                  <div>
                    <Typography variant="h4">
                      {CurrencyConverter(coupon.discount)}
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      variant="subtitle1"
                      className={classes.couponCode}
                    >
                      {dict.account.couponsCode}:
                      <b>
                        {coupon.couponCode}{" "}
                        <FiCopy
                          fontSize={"1.5em"}
                          onClick={() => {
                            navigator.clipboard.writeText(coupon.couponCode);

                            ToastStatus("Success", "Coupon copied");
                          }}
                        />
                      </b>
                    </Typography>
                    <Typography variant="subtitle1">
                      {dict.account.couponsMinPurchase}:{" "}
                      {CurrencyConverter(coupon.minValue)}
                    </Typography>
                  </div>
                  <div className={classes.discountImg}>
                    <CustomImage
                      src={"/assets/discountImage.png"}
                      alt="discount"
                      width={40}
                      height={40}
                    />
                  </div>
                </div>
                <Divider />
                <div className={classes.couponBottom}>
                  <Typography variant="subtitle2" sx={{ pr: 3 }}>
                    {dict.account.couponsValidFrom}:
                    {new Date(coupon.validFrom).toLocaleDateString()}
                  </Typography>
                  <Typography variant="subtitle2">
                    {dict.account.couponsValidTo}:{" "}
                    {new Date(coupon.validTo).toLocaleDateString()}
                  </Typography>
                </div>
              </Paper>
            ))}
          </Paper>
        </div>
      </div>
      <div className={classes.prevNext}>
        <Link href="/profile/orders">
          <Typography variant="h5" sx={{ pb: 1 }}>
            <BsChevronLeft fontSize={"0.75em"} />
            {dict.account.prev}
          </Typography>
          <Typography variant="h5"> {dict.account.ordersTitle}</Typography>
        </Link>
        <Link href="/profile/change-password">
          <Typography variant="h5" sx={{ pb: 1 }}>
            {dict.account.next}
            <BsChevronRight fontSize={"0.75em"} />
          </Typography>
          <Typography variant="h5">
            {dict.account.changePasswordTitle}
          </Typography>
        </Link>
      </div>
    </div>
  );
}
