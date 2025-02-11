"use client";

// ** Next, React And Locals Imports
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Cart from "@/components/Cart/CartModal/CartModal";
import useStyles from "./styles.js";

// ** MUI Imports
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

// ** Third Party Imports
import { AiOutlineHome } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { BsCart2 } from "react-icons/bs";
import { RxPerson } from "react-icons/rx";

export default function BottomNav({ dict }) {
  const { classes } = useStyles();
  const pathname = usePathname();

  // States
  const [showNav, setShowNav] = useState(false);
  const [value, setValue] = useState(0);
  const [showCart, setShowCart] = useState(false);

  // Handle cart
  const handleCart = () => {
    setShowCart(!showCart);
  };

  // Hide bottomNav on below pages
  const pages = [
    "login",
    "register",
    "forgot-password",
    "checkout",
    "payment",
    "p", //product page
    "404",
    "shop",
  ];

  useEffect(() => {
    const currentPage = pathname.split("/")[2];

    if (pages.includes(currentPage)) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  }, [pathname]);

  return (
    <>
      {showNav && (
        <Paper elevation={3} className={classes.container}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              label={dict.bottomNav.home}
              icon={<AiOutlineHome />}
              href="/"
              className={classes.navItem}
            />
            <BottomNavigationAction
              label={dict.bottomNav.shop}
              icon={<BiCategoryAlt />}
              href="/shop/all"
              className={classes.navItem}
            />
            <BottomNavigationAction
              label={dict.bottomNav.profile}
              icon={<RxPerson />}
              href="/profile"
              className={classes.navItem}
            />
            <BottomNavigationAction
              label={dict.bottomNav.cart}
              icon={<BsCart2 />}
              onClick={() => setShowCart(!showCart)}
              className={classes.navItem}
            />
          </BottomNavigation>
        </Paper>
      )}
      {/* Cart */}
      {showCart && <Cart dict={dict} action={handleCart} />}
    </>
  );
}
