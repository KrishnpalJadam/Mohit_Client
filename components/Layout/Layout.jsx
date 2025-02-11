// ** Next, React And Locals Imports
import Topbar from "./Topbar/Topbar";
import Header from "./Header/Header";
import BottomNav from "./BottomNav/BottomNav";
import Footer from "./Footer/Footer";

export default function Layout({
  dict,
  children,
  siteSettings,
  productSettings,
  cart,
  isAuth,
}) {
  return (
    <div>
      {siteSettings?.topbar && <Topbar settings={siteSettings} />}
      <Header
        dict={dict}
        siteSettings={siteSettings}
        productSettings={productSettings}
        cart={cart}
        isAuth={isAuth}
      />
      {children}
      <BottomNav dict={dict} productSettings={productSettings} />
      <Footer
        dict={dict}
        siteSettings={siteSettings}
        productSettings={productSettings}
      />
    </div>
  );
}
