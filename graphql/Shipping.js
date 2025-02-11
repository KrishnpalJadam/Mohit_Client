export const GET_SHIPPING_FEES = `
  query {
    getShipping {
      _id
      fees
      minValue
      expectedDelivery
    }
  }
`;
