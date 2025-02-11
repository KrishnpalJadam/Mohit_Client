const GetMatchingVariant = (productData, selectedOptions) => {
  if (!productData) return null;

  const {
    _id,
    name,
    description,
    category,
    productType,
    images,
    salePrice,
    regularPrice,
    stock,
    tax,
    variants,
  } = productData;

  // If product is simple, return product data directly
  if (productType === "simple") {
    return productData;
  }

  // For variable products, if no options are selected, return the product data (parent data)
  if (productType === "variable") {
    const selectedAttributesCount = Object.keys(selectedOptions).length;
    const requiredAttributesCount = Object.keys(
      variants[0]?.attributes || {}
    ).length;

    if (selectedAttributesCount !== requiredAttributesCount) {
      return productData;
    }

    // Find a variant that matches all selected options
    const matchingVariant = variants.find((variant) => {
      return Object.keys(selectedOptions).every((attribute) => {
        return (
          variant.attributes[attribute]?.value === selectedOptions[attribute]
        );
      });
    });

    // Extract and format the variant name, e.g., "Black / XL"
    const variantName = matchingVariant
      ? Object.values(matchingVariant.attributes)
          .map((attr) => attr.value)
          .join(" / ")
      : null;

    return {
      _id,
      name,
      description,
      category,
      productType,
      images:
        matchingVariant?.images?.length > 0 ? matchingVariant.images : images,
      regularPrice: matchingVariant?.regularPrice ?? regularPrice,
      salePrice: matchingVariant?.salePrice ?? salePrice,
      stock: matchingVariant?.stock ?? stock,
      tax: matchingVariant?.tax ?? tax,
      variantId: matchingVariant?._id,
      variantName,
    };
  }

  return null;
};

export default GetMatchingVariant;
