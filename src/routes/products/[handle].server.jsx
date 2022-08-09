import {
    gql,
    useShopQuery,
    useServerAnalytics,
    useRouteParams,
    ShopifyAnalyticsConstants,
    Seo
  } from "@shopify/hydrogen";
import { ShopifyServerAnalyticsConnector } from "@shopify/hydrogen/config";
  import { Suspense } from "react";

  import { Layout } from "../../components/Layout.server";
//   import ProductDetails from "../../components/ProductDetails.client";
  
  export default function Product({ params }) {
    const { handle } = useRouteParams();
    
    const {
        data: { product },
    } = useShopQuery({
        query: PRODUCT_QUERY,
        variables: {
            handle
        }
    })

    useServerAnalytics({
        shopify: {
            pageType: ShopifyAnalyticsConstants.pageType.product,
            resourceId: product.id
        }
    })

    return (
      <Layout>
        <Suspense>
            <Seo type="product" data={product} />
        </Suspense>
        <section className="w-full overflow-x-hidden gap-4 md:gap-8 grid px-6 md:px-8 lg:px-12">
            <div className="grid gap-2 mt-10">
            <h1 className="text-4xl font-bold leading-10 whitespace-normal">
                {product.title}
            </h1>
            <span className="max-w-prose whitespace-pre-wrap inherit text-copy opacity-50 font-medium">
                {product.vendor}
            </span>
            </div>
        </section>
      </Layout>
    );
  }

const PRODUCT_QUERY = gql`
fragment MediaFields on Media {
    mediaContentType
    alt
    previewImage {
      url
    }
    ... on MediaImage {
      id
      image {
        url
        width
        height
      }
    }
    ... on Video {
      id
      sources {
        mimeType
        url
      }
    }
    ... on Model3d {
      id
      sources {
        mimeType
        url
      }
    }
    ... on ExternalVideo {
      id
      embedUrl
      host
    }
  }
  query ProductDetails($handle: String!) {
    product(handle: $handle) {
      id
      title
      vendor
      descriptionHtml
      media(first: 7) {
        nodes {
          ...MediaFields
        }
      }
      variants(first: 100) {
        nodes {
          id
          availableForSale
          compareAtPriceV2 {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
          image {
            id
            url
            altText
            width
            height
          }
          priceV2 {
            amount
            currencyCode
          }
          sku
          title
          unitPrice {
            amount
            currencyCode
          }
        }
      }
      seo {
        description
        title
      }
    }
  }
`;