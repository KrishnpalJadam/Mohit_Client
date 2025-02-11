const DiscountCalculator = (arg1, arg2) => {
  const regularPrice = parseFloat(arg1);
  const salesPrice = parseFloat(arg2);

  return Math.round(((regularPrice - salesPrice) / regularPrice) * 100);
};

export default DiscountCalculator;
