export const GET_CUSTOMER = `
  query {
    getCustomer {
      firstName
      lastName
      avatar
      email
      phoneNumber
      gender
      dob
      address {
        address1
        address2
        city
        state
        country
        postal_code
      }
      status
      message
    }
  }
`;

export const CUSTOMERS = `
  mutation (
    $firstName: String
    $lastName: String
    $avatar: String
    $phoneNumber: String
    $gender: String
    $dob: String
    $address: addressInputType
  ) {
    customers(
      firstName: $firstName
      lastName: $lastName
      avatar: $avatar
      phoneNumber: $phoneNumber
      gender: $gender
      dob: $dob
      address: $address
    ) {
      firstName
      lastName
      avatar
      email
      phoneNumber
      gender
      dob
      address {
        address1
        address2
        city
        state
        country
        postal_code
      }
      status
      message
    }
  }
`;

export const GET_WISHLIST_PRODUCTS = `
  query{
    getWishlistProducts{
     products{
        _id
        name
        images
        regularPrice
        salePrice
        variants {
          attributes
        }
        trending
      }
      status
      message
    }
  }
`;

export const ADD_TO_WISHLIST = `
  mutation ($productId: String!) {
    addToWishlist(productId: $productId) {
      status
      message
    }
  }
`;
