// ** Next, React And Locals Imports
import Layout1 from "./Layout1/Layout1";
import Layout2 from "./Layout2/Layout2";

export default function Footer({ dict, siteSettings, productSettings }) {
  // Site description
  const siteDescription =
    "Fabyoh is a NextJs Based Seo Optimized Readymade eCommerce Script With Advanced Features Built For Small Business Owners And Entrepreneurs";

  // Other required data
  const footerType = siteSettings?.footerLayout;

  const categories = productSettings?.categories;

  const socials = siteSettings?.socials;

  const websiteLogo = siteSettings?.logo;

  return (
    <div id="turnOffCart">
      {footerType === "footerType1" && (
        <Layout1
          dict={dict}
          categories={categories}
          socials={socials}
          websiteLogo={websiteLogo}
          siteDescription={siteDescription}
        />
      )}
      {footerType === "footerType2" && (
        <Layout2 dict={dict} categories={categories} socials={socials} />
      )}
    </div>
  );
}
