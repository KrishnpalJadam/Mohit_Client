// ** Next, React And Locals Imports
import Layout1 from "./Layout1/Layout1";
import Layout2 from "./Layout2/Layout2";

export default function Cards({
  products,
  productSettings,
  title,
  loading,
  totalLoadingCount,
  isWishlist,
}) {
  const productCardType = productSettings?.productCardType;

  return (
    <div>
      {productCardType === "cardType1" && (
        <Layout1
          products={products}
          title={title}
          isWishlist={isWishlist}
          loading={loading}
          totalLoadingCount={totalLoadingCount}
        />
      )}
      {productCardType === "cardType2" && (
        <Layout2
          products={products}
          title={title}
          isWishlist={isWishlist}
          loading={loading}
          totalLoadingCount={totalLoadingCount}
        />
      )}
    </div>
  );
}
