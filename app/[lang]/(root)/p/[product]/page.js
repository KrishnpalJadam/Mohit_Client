// ** Next, React And Locals Imports
import {
  fetchProductByNameAPI,
  fetchProductsByCategoryAPI,
} from "@/actions/products.actions.js";
import { fetchProductSettingsAPI } from "@/actions/productsettings.actions.js";
import { fetchSiteSettingsAPI } from "@/actions/sitesettings.actions.js";
import { fetchShippingAPI } from "@/actions/shipping.actions.js";
import { fetchStaticPagesAPI } from "@/actions/staticpages.actions.js";
import CapitalizeText from "@/helpers/CapitalizeText";
import { getDictionary } from "@/locales/dictionaries.js";
import ProductComp from "@/components/Product/Product";

export async function generateMetadata({ params }) {
  const { product } = await params;

  // Fetch the product data based on the product name from the URL
  const productData = await fetchProductByNameAPI(product);

  // Clean up description by removing HTML tags & spaces
  const plainDescription = productData.description
    ? productData.description
        .replace(/<\/?[^>]+(>|$)/g, "")
        .replace(/\s+/g, " ")
        .trim()
    : "";

  // Truncate the description to 160 characters
  const truncatedDescription =
    plainDescription.length > 160
      ? plainDescription.substring(0, 157) + "..."
      : plainDescription;

  // Open graph images
  const productImageUrls = productData.images.map(
    (image) => process.env.NEXT_PUBLIC_BACKEND_URL + "product/" + image
  );

  // Return dynamic SEO metadata for the product
  return {
    title: `${CapitalizeText(productData.name)} | Mohit Brother`,
    description: truncatedDescription,
    openGraph: {
      title: `${CapitalizeText(productData.name)} | Mohit Brother`,
      description: truncatedDescription,
      images: productImageUrls,
    },
    twitter: {
      card: "summary_large_image",
      title: `${CapitalizeText(productData.name)} | Mohit Brother`,
      description: truncatedDescription,
      images: productImageUrls[0],
    },
  };
}

export default async function Product({ params }) {
  const { lang, product } = await params;

  // Intl
  const dict = await getDictionary(lang);

  // Data
  const productData = await fetchProductByNameAPI(product);

  const relatedProducts = await fetchProductsByCategoryAPI(
    productData?.category
  );

  const siteSettings = await fetchSiteSettingsAPI();

  const productSettings = await fetchProductSettingsAPI();

  const shippingFees = await fetchShippingAPI();

  const staticPages = await fetchStaticPagesAPI();

  // Shipping
  let shippingPolicy;

  const expectedDeliveryDays = shippingFees?.expectedDelivery;

  const expectedDelivery = () => {
    const d = new Date();
    d.setDate(d.getDate() + expectedDeliveryDays);

    return new Date(d).toDateString();
  };

  if (staticPages) {
    shippingPolicy = staticPages.find((page) => {
      return page.pageName === "shipping-policy";
    });
  }

  return (
    <ProductComp
      dict={dict}
      productData={productData}
      relatedProducts={relatedProducts?.slice(0, 4)}
      siteSettings={siteSettings}
      productSettings={productSettings}
      shippingPolicy={shippingPolicy}
      expectedDelivery={expectedDelivery()}
    />
  );
}
