export const GET_PRODUCTS = `
 query (
    $page: Int!
    $limit: Int!
    $category: [String]
    $priceRange: [String]
    $trending: Boolean
    $inStock: Boolean
    $sortBy: String
  ) {
    getProducts(
      page: $page
      limit: $limit
      category: $category
      priceRange: $priceRange
      trending: $trending
      inStock: $inStock
      sortBy: $sortBy
    ) {
      totalCount
      products {
        _id
        name
        description
        category
        productType
        images
        regularPrice
        salePrice
        tax
        stock
        variants {
          _id
          attributes
          images
          regularPrice
          salePrice
          tax
          stock
        }
        reviews {
          customer {
            firstName
            lastName
          }
          rating
          comment
          media
        }
        trending
      }
    }
  }
`;

export const GET_PRODUCT_BY_NAME = `
  mutation ($name: String!) {
    getProductByName(name: $name) {
        _id
        name
        description
        category
        productType
        images
        regularPrice
        salePrice
        tax
        stock
        variants {
          _id
          attributes
          images
          regularPrice
          salePrice
          tax
          stock
        }
        reviews {
          customer {
            firstName
            lastName
        }
          rating
          comment
          media
      }
      trending
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY = `
  mutation ($category: String!) {
    getProductsByCategory(category: $category) {
       _id
        name
        description
        category
        productType
        images
        regularPrice
        salePrice
        tax
        stock
        variants {
          _id
          attributes
          images
          regularPrice
          salePrice
          tax
          stock
        }
        reviews {
          customer {
            firstName
            lastName
          }
          rating
          comment
          media
        }
        trending
    }
  }
`;

export const ADD_PRODUCT_REVIEW = `
  mutation ($productId: String!, $review: reviewsInputType!) {
    addProductReview(productId: $productId, review: $review) {
      status
      message
    }
  }
`;

export const GET_SEARCH_RESULTS = `
  query ($searchTerm: String!) {
    getSearchResults(searchTerm: $searchTerm) {
        name
        images
        regularPrice
        salePrice
        variants {
          attributes
        }
        trending
    }
  }
`;
