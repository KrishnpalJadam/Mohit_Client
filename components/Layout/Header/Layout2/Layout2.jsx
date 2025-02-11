// ** Next, React And Locals Imports
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FormatLink from "@/helpers/FormatLink";
import Cart from "@/components/Cart/CartModal/CartModal";
import CustomLink from "@/components/Link/CustomLink";
import ProfileModal from "../ProfileModal/ProfileModal";
import CustomImage from "@/components/Image/CustomImage";
import MobileMenu from "../MobileMenu/MobileMenu";
import LangCurrency from "../LangCurrency/LangCurrency";
import SearchBar from "../SearchBar/SearchBar";
import useStyles from "./styles.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

// ** Third Party Imports
import { Twirl as Hamburger } from "hamburger-react";
import { CiGlobe } from "react-icons/ci";
import { RxPerson } from "react-icons/rx";
import { BsCart2 } from "react-icons/bs";

export default function Layout2({
  dict,
  categories,
  websiteLogo,
  totalQuantity,
  isAuth,
}) {
  const { classes } = useStyles();
  const pathname = usePathname();

  // States
  const [profile, setProfile] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [langCurrency, setLangCurrency] = useState(false);
  const [showCart, setShowCart] = useState(false);

  // Closing the modal when route changes
  useEffect(() => {
    setProfile(false);
    setMobileMenu(false);
  }, [pathname]);

  // Handle cart
  const handleCart = () => {
    setShowCart(!showCart);
  };

  // Profile modal
  const handleProfile = () => {
    setProfile(!profile);
  };

  // Handle language & currency modal
  const handleIntlModal = () => {
    setLangCurrency(!langCurrency);
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.header}>
          {/* Hamburger menu */}
          <div className={classes.hamBurgerMenu}>
            <Hamburger size={25} toggled={mobileMenu} toggle={setMobileMenu} />
          </div>
          {/* Logo */}
          <div className={classes.logoContainer}>
            {websiteLogo ? (
              <div>
                <Link href="/">
                  <CustomImage
                    src={
                      process.env.NEXT_PUBLIC_BACKEND_URL +
                      "logos/" +
                      websiteLogo
                    }
                    alt="website logo"
                    fill={true}
                  />
                </Link>
              </div>
            ) : (
              <Typography variant="h4">
                <CustomLink href="/" text={process.env.NEXT_PUBLIC_SITE_NAME} />
              </Typography>
            )}
          </div>
          {/* Categories */}
          <div className={classes.categories}>
            {categories?.slice(0, 4).map((category, index) => (
              <Typography
                key={index}
                variant="subtitle1"
                className={classes.category}
              >
                <CustomLink
                  text={category.toUpperCase()}
                  href={"/shop/" + FormatLink(category)}
                />
              </Typography>
            ))}
          </div>
          {/* Essentials*/}
          <div className={classes.essentials}>
            <div className={classes.icon}>
              <SearchBar dict={dict} />{" "}
            </div>
            {/* Language & currency switcher */}
            <div className={classes.intlIcon}>
              {/* <div className={classes.icon}> */}
                {/* <CiGlobe
                  fontSize={"1.5em"}
                  onClick={() => setLangCurrency(!langCurrency)}
                /> */}
              {/* </div> */}
            </div>
            <div className={classes.profileIcon}>
              <div className={classes.icon}>
                <RxPerson
                  fontSize={"1.5em"}
                  onClick={handleProfile}
                  id="profileIcon"
                />
              </div>
              <div className={classes.profileModal}>
                {profile && (
                  <ProfileModal
                    dict={dict}
                    closeModal={handleProfile}
                    isAuth={isAuth}
                  />
                )}
              </div>
            </div>
            <div className={classes.cartIcon}>
              <div className={classes.icon}>
                <BsCart2 fontSize={"1.5em"} onClick={handleCart} />
              </div>
              {totalQuantity > 0 && (
                <Typography
                  variant="subtitle2"
                  className={classes.cartQuantity}
                >
                  {totalQuantity}
                </Typography>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <MobileMenu
        dict={dict}
        mobileMenu={mobileMenu}
        categories={categories}
        isAuth={isAuth}
        closeMenu={() => setMobileMenu(false)}
      />
      {/* Language & currency modal */}
      <Modal open={langCurrency} onClose={handleIntlModal}>
        <LangCurrency dict={dict} handleIntlModal={handleIntlModal} />
      </Modal>
      {/* Cart */}
      {showCart && <Cart dict={dict} action={handleCart} />}
    </>
  );
}
