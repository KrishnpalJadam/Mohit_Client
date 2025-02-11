"use client";

// ** Next, React And Locals Imports
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "@/redux/slices/cart";
import Layout1 from "./Layout1/Layout1";
import Layout2 from "./Layout2/Layout2";

export default function Header({
  dict,
  siteSettings,
  productSettings,
  cart,
  isAuth,
}) {
  const dispatch = useDispatch();

  // Other required data
  const headerType = siteSettings?.headerLayout;

  const categories = productSettings?.categories;

  const websiteLogo = siteSettings?.logo;

  useEffect(() => {
    if (cart?._id) {
      dispatch(getCart(cart));
    }
  }, [cart]);

  // Cart
  const cartProducts = useSelector((state) => state.cart.cart?.products);

  let totalQuantity;

  if (cartProducts?.length > 0) {
    const cartQuantity = [];

    cartProducts.map((product) => cartQuantity.push(product.quantity));

    totalQuantity = cartQuantity.reduce((a, b) => {
      return a + b;
    }, 0);
  }

  return (
    <div>
      {headerType === "headerType1" && (
        <Layout1
          dict={dict}
          categories={categories}
          websiteLogo={websiteLogo}
          totalQuantity={totalQuantity}
          isAuth={isAuth}
        />
      )}
      {headerType === "headerType2" && (
        <Layout2
          dict={dict}
          categories={categories}
          websiteLogo={websiteLogo}
          totalQuantity={totalQuantity}
          isAuth={isAuth}
        />
      )}
    </div>
  );
}
