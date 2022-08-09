// find product by query "tag"
query FirstTwentyOneProducts {
    products(first: 5, query: "tag:newborn") {
     edges {
      node {
        id
        title
        tags
      }
    } 
    }
  }

// find product by query "tag" not including tag
  query FirstTwentyOneProducts {
    products(first: 5, query: "-tag:newborn") {
     edges {
      node {
        id
        title
        tags
      }
    } 
    }
  }


  // get product by ID 

  query ProductDetails($id: ID!) {
    product(id: $id) {
      title
      description
    }
  }

  // query
  {
    "id": "gid://shopify/Product/7896810651813"
  }

  // product with handle 
  query ProductDetails($handle: String!) {
    product(handle: $handle) {
      title
      handle
      description
      variants (first: 10) {
        nodes {
          id
          title
          barcode
          quantityAvailable
        }
      }
    }
  }

  // query
  {
    "handle": "boys-orange-white-kurta-set-3"
  }