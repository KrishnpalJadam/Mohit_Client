"use client";

// ** Next, React And Locals Imports
import CapitalizeText from "@/helpers/CapitalizeText";
import CurrencyConverter from "@/helpers/CurrencyConverter";
import CustomLink from "@/components/Link/CustomLink";
import CustomImage from "@/components/Image/CustomImage";
import SecondaryButton from "@/components/Button/SecondaryButton";
import useStyles from "./styles.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";

export default function ViewOrder({ dict, customerData, orderData, guest }) {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.orderTop}>
        <Typography variant="h5">
          <b>{dict.account.orderId}</b>: #{orderData._id}
        </Typography>
        {!guest && (
          <SecondaryButton
            href="/profile/orders"
            text={dict.account.orderGoBack}
          />
        )}
      </div>
      <Paper className={classes.viewOrder}>
        <>
          <Typography variant="h5">
            {dict.account.orderStatus}:
            <span className={classes.highlight}>
              {" "}
              {CapitalizeText(orderData.deliveryStatus)}
            </span>
          </Typography>
          <div className={classes.tabs}>
            <div
              className={`${classes.tab} ${
                orderData.deliveryStatus === "processing"
                  ? classes.tabHighlight
                  : ""
              }`}
            >
              {orderData.deliveryStatus === "processing" ? (
                <CustomImage
                  src={"/assets/Gif/orderProcessing.gif"}
                  alt="order processing"
                  width={70}
                  height={70}
                />
              ) : (
                <CustomImage
                  src={"/assets/orderProcessing.png"}
                  alt="order processing"
                  width={70}
                  height={70}
                />
              )}
            </div>
            <div
              className={`${classes.tab} ${
                orderData.deliveryStatus === "shipped"
                  ? classes.tabHighlight
                  : ""
              }`}
            >
              {orderData.deliveryStatus === "shipped" ? (
                <CustomImage
                  src={"/assets/Gif/orderShipped.gif"}
                  alt="order shipped"
                  width={70}
                  height={70}
                />
              ) : (
                <CustomImage
                  src={"/assets/orderShipped.png"}
                  alt="order shipped"
                  width={70}
                  height={70}
                />
              )}
            </div>
            <div
              className={`${classes.tab} ${
                orderData.deliveryStatus === "outForDelivery"
                  ? classes.tabHighlight
                  : ""
              }`}
            >
              {orderData.deliveryStatus === "outForDelivery" ? (
                <CustomImage
                  src={"/assets/Gif/orderOutForDelivery.gif"}
                  alt="order out for delivery"
                  width={70}
                  height={70}
                />
              ) : (
                <CustomImage
                  src={"/assets/orderOutForDelivery.png"}
                  alt="order out for delivery"
                  width={70}
                  height={70}
                />
              )}
            </div>
            <div
              className={`${classes.tab} ${
                orderData.deliveryStatus === "delivered"
                  ? classes.tabHighlight
                  : ""
              }`}
            >
              {orderData.deliveryStatus === "delivered" ? (
                <CustomImage
                  src={"/assets/Gif/orderDelivered.gif"}
                  alt="order delivered"
                  width={70}
                  height={70}
                />
              ) : (
                <CustomImage
                  src={"/assets/orderDelivered.png"}
                  alt="order delivered"
                  width={70}
                  height={70}
                />
              )}
            </div>
          </div>
        </>
        {/* Product Details */}
        <div className={classes.productDetails}>
          <Typography variant="h5" sx={{ pb: 3 }}>
            {dict.account.orderPurchasedItems}:
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 550 }}>
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <Typography variant="h6">
                      {dict.account.orderProduct}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">
                      {dict.account.orderQuantity}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">
                      {dict.account.orderPrice}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderData.products?.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row" align="left">
                      <div className={classes.productTab}>
                        <CustomImage
                          src={
                            process.env.NEXT_PUBLIC_BACKEND_URL +
                            "product/" +
                            product.images[0]
                          }
                          alt={product.name}
                          width={90}
                          height={85}
                          style={classes.productImage}
                        />
                        <div>
                          <Typography variant="h6">{product.name}</Typography>
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
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle1">
                        {product.quantity}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle1">
                        {CurrencyConverter(product.price)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    align="right"
                    sx={{ borderBottom: "none" }}
                  >
                    <Typography variant="h6"></Typography>
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    align="right"
                    sx={{ borderBottom: "none" }}
                  >
                    <Typography variant="subtitle1">
                      {dict.account.orderMrp}:
                    </Typography>
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    align="left"
                    sx={{ borderBottom: "none" }}
                  >
                    <Typography variant="subtitle1">
                      {CurrencyConverter(orderData.mrp)}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    align="right"
                    sx={{ borderBottom: "none" }}
                  >
                    <Typography variant="subtitle1"></Typography>
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    align="right"
                    sx={{ borderBottom: "none" }}
                  >
                    <Typography variant="subtitle1">
                      {dict.account.orderShippingText}:
                    </Typography>
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    align="left"
                    sx={{ borderBottom: "none" }}
                  >
                    <Typography variant="subtitle1">
                      {orderData.shippingFees === dict.account.orderShippingFree
                        ? dict.account.orderShippingFree
                        : CurrencyConverter(orderData.shippingFees)}
                    </Typography>
                  </TableCell>
                </TableRow>
                {orderData.appliedCoupon && (
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      align="right"
                      sx={{ borderBottom: "none" }}
                    >
                      <Typography variant="subtitle1"></Typography>
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      align="right"
                      sx={{ borderBottom: "none" }}
                    >
                      <Typography variant="subtitle1">
                        {dict.account.orderCouponDiscount} (
                        <span className={classes.appliedCoupon}>
                          {orderData.appliedCoupon}
                        </span>
                        ) :
                      </Typography>
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      align="left"
                      sx={{ borderBottom: "none" }}
                    >
                      <Typography variant="subtitle1">
                        - {CurrencyConverter(orderData.couponDiscount)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell component="th" scope="row" align="right">
                    <Typography variant="subtitle1"></Typography>
                  </TableCell>
                  <TableCell component="th" scope="row" align="right">
                    <Typography variant="subtitle1">
                      {dict.account.orderTaxes}:
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row" align="left">
                    <Typography variant="subtitle1">
                      {CurrencyConverter(orderData.taxes)}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" align="right">
                    <Typography variant="subtitle1"></Typography>
                  </TableCell>
                  <TableCell component="th" scope="row" align="right">
                    <Typography variant="subtitle1">
                      {dict.account.orderTotal}:
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row" align="left">
                    <Typography variant="subtitle1">
                      <b>{CurrencyConverter(orderData.totalAmount)}</b>
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            {/* Error  */}
          </TableContainer>
        </div>
        {/* Customer Details */}
        {customerData?.address && (
          <div className={classes.deliveryDetails}>
            <Typography variant="h5" sx={{ pb: 2 }}>
              {dict.account.orderDeliveryDetails}:
            </Typography>
            <div>
              <Typography variant="subtitle1">
                {dict.account.orderCustomerName}: {customerData.name}
              </Typography>
              <Typography variant="subtitle1">
                {dict.account.orderCustomerEmail}: {customerData.email}
              </Typography>
              <Typography variant="subtitle1">
                {dict.account.orderCustomerPhone}: {customerData.phoneNumber}
              </Typography>
              <Typography variant="subtitle1">
                {dict.account.orderCustomerAddress}:{" "}
                {`${customerData.address.address1}, ${customerData.address.address2}, ${customerData.address.city}, ${customerData.address.state}, ${customerData.address.country}, ${customerData?.address.postal_code}`}
              </Typography>
            </div>
          </div>
        )}
        {/* Other Details */}
        <div className={classes.otherDetails}>
          <Typography variant="h5" sx={{ pb: 2 }}>
            {dict.account.orderOtherDetails}:
          </Typography>
          <Typography variant="subtitle1">
            {dict.account.orderId}: #{orderData._id}
          </Typography>
          <Typography variant="subtitle1">
            {dict.account.orderPaymentMethod}: {orderData.paymentMethod}
          </Typography>
        </div>
        {/* Need Help */}
        <div className={classes.help}>
          <Typography variant="h5" sx={{ pb: 2 }}>
            {dict.account.orderHelp}
          </Typography>
          <Typography variant="subtitle1">
            {dict.account.orderHelpText1}{" "}
            <CustomLink
              href="/help"
              text="contact us"
              color={true}
              hover={true}
            />{" "}
            {dict.account.orderHelpText2}
          </Typography>
        </div>
      </Paper>
    </div>
  );
}
