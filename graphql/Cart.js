export const GET_CART = `
  query ($cartId: String!) {
    getCart(cartId: $cartId) {
     _id
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
      }
    }
`;

export const ADD_TO_CART = `
  mutation (
    $cartId: String
    $productId: String!
    $name: String!
    $images: [String!]!
    $price: Float!
    $tax: Float!
    $variantId: String
    $variantName: String
  ) {
    addToCart(
      cartId:$cartId
      productId: $productId
      name: $name
      images: $images
      price: $price
      tax: $tax
      variantId: $variantId
      variantName: $variantName
    ) {
      _id
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
      status
      message
    }
  }
`;

export const CHANGE_CART_QUANTITY = `
  mutation (
    $cartId: String!
    $productId: String!
    $action: String!
    $variantId: String
  ) {
    changeCartQuantity(
      cartId: $cartId
      productId: $productId
      action: $action
      variantId: $variantId
    ) {
      _id
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
      status
      message
    }
  }
`;

export const DELETE_FROM_CART = `
  mutation ($cartId: String!, $productId: String!, $variantId: String) {
    deleteFromCart(
      cartId: $cartId
      productId: $productId
      variantId: $variantId
    ) {
      _id
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
      status
      message
    }
  }
`;
