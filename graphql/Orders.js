export const CREATE_ORDER = `
  mutation (
    $cartId:String!
    $customer: orderCustomerInputType!
    $appliedCoupon: String
    $couponDiscount: Int
    $paymentMethod: String!
    $paymentStatus: String!
    $mrp: Float!
    $taxes: Float!
    $totalAmount: Float!
    $shippingFees: String!
    $expectedDelivery: String!
  ) {
    createOrder(
      cartId: $cartId
      customer: $customer
      appliedCoupon: $appliedCoupon
      couponDiscount: $couponDiscount
      paymentMethod: $paymentMethod
      paymentStatus: $paymentStatus
      mrp: $mrp
      taxes: $taxes
      totalAmount: $totalAmount
      shippingFees: $shippingFees
      expectedDelivery: $expectedDelivery
    ) {
      _id
      status
      message
    }
  }
`;

export const GET_ORDER_BY_ID = `
  mutation ($id: String!) {
    getOrderById(id: $id) {
      _id
      customer {
        customerId
        name
        email
        phoneNumber
        address {
          address1
          address2
          city
          state
          country
          postal_code
        }
      }
      products {
        productId
        name
        images
        price
        tax
        variantId
        variantName
        quantity
      }
      appliedCoupon
      couponDiscount
      paymentMethod
      paymentStatus
      deliveryStatus
      dateOfPurchase
      mrp
      taxes
      totalAmount
      shippingFees
      expectedDelivery
      status
      message
    }
  }
`;

export const GET_CUSTOMER_ORDERS = `
  mutation ($customerId: String) {
    getOrdersByCustomerId(customerId: $customerId) {
      _id
      customer {
        customerId
        name
        email
        phoneNumber
        address {
          address1
          address2
          city
          state
          country
          postal_code
        }
      }
      products {
        productId
        name
        images
        price
        tax
        variantId
        variantName
        quantity
      }
      appliedCoupon
      couponDiscount
      paymentMethod
      paymentStatus
      deliveryStatus
      dateOfPurchase
      mrp
      taxes
      totalAmount
      shippingFees
      expectedDelivery
      status
      message
    }
  }
`;
