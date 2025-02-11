export const GET_COUPONS = `
  query {
    getCoupons {
      _id
      couponCode
      couponType
      discount
      limitPerUser
      maxValue
      minValue
      validFrom
      validTo
      isEnabled
    }
  }
`;

export const CHECK_COUPON = `
  mutation ($couponCode: String!, $cartValue: Float!) {
    checkCoupon(couponCode: $couponCode, cartValue: $cartValue) {
      couponCode
      discount
      status
      message
    }
  }
`;
