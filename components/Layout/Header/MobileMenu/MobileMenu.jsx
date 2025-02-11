// ** Next, React And Locals Imports
import { useState } from "react";
import { logoutAPI } from "@/actions/auth.actions.js";
import CapitalizeText from "@/helpers/CapitalizeText.js";
import FormatLink from "@/helpers/FormatLink.js";
import CustomLink from "@/components/Link/CustomLink";
import LangCurrency from "../LangCurrency/LangCurrency";
import useStyles from "./styles.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

// ** Third Party Imports
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { MdClose } from "react-icons/md";

export default function MobileMenu({
  dict,
  mobileMenu,
  categories,
  isAuth,
  closeMenu,
}) {
  const { classes } = useStyles();

  // States
  const [showCategories, setShowCategories] = useState(false);
  const [langCurrency, setLangCurrency] = useState(false);

  // Essentials
  const essentials = [
    { page: dict.mobileMenu.essentialsProfile, link: "profile" },
    { page: dict.mobileMenu.essentialsWishlist, link: "profile/wishlist" },
    { page: dict.mobileMenu.essentialsHelp, link: "help" },
  ];

  // Handle language & currency modal
  const handleIntlModal = () => {
    setLangCurrency(!langCurrency);
  };

  // Logout
  const handleLogout = () => {
    logoutAPI();
  };

  return (
    <>
      {mobileMenu && (
        <div className={classes.container}>
          <div className={classes.mobileMenu}>
            <div className={classes.closeIcon}>
              <MdClose fontSize={"1.5em"} onClick={closeMenu} />
            </div>
            {/* Shop All */}
            <Typography variant="h5" className={classes.menu}>
              <CustomLink text={dict.mobileMenu.shop} href={"/shop/all"} />
            </Typography>
            {/* Categories */}
            <div>
              <Typography
                variant="h5"
                className={classes.menu}
                onClick={() => setShowCategories(!showCategories)}
              >
                {dict.mobileMenu.categories}
                {showCategories ? (
                  <BsChevronUp sx={{ ml: 1 }} />
                ) : (
                  <BsChevronDown sx={{ ml: 1 }} />
                )}
              </Typography>
              {showCategories && (
                <>
                  {categories.map((category, index) => {
                    return (
                      <Typography
                        key={index}
                        variant="h5"
                        className={`${classes.menu} ${classes.subMenu}`}
                      >
                        <CustomLink
                          text={CapitalizeText(category)}
                          href={`${"/shop/" + FormatLink(category)}`}
                        />
                      </Typography>
                    );
                  })}
                </>
              )}
            </div>
            {/* Essentials */}
            <div>
              {essentials.map((item, index) => {
                return (
                  <Typography key={index} variant="h5" className={classes.menu}>
                    <CustomLink
                      text={item.page}
                      href={`/${FormatLink(item.link)}`}
                    />
                  </Typography>
                );
              })}
            </div>
            {/* Change language / Currency */}
            <Typography
              variant="h5"
              className={classes.menu}
              onClick={() => handleIntlModal()}
            >
              {dict.mobileMenu.changeLangCurrency}
            </Typography>
            {/* Login & Logout */}
            <div>
              {isAuth ? (
                <Typography
                  variant="h5"
                  className={classes.menu}
                  onClick={handleLogout}
                >
                  {dict.mobileMenu.logout}
                </Typography>
              ) : (
                <Typography variant="h5" className={classes.menu}>
                  <CustomLink text={dict.mobileMenu.login} href={"/login"} />
                </Typography>
              )}
            </div>
            {/* Language & currency modal */}
            <Modal open={langCurrency} onClose={handleIntlModal}>
              <LangCurrency dict={dict} handleIntlModal={handleIntlModal} />
            </Modal>
          </div>
        </div>
      )}
    </>
  );
}
