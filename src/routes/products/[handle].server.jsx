import { Suspense } from "react";
import {
    gql,
    Seo,
    useShopQuery,
    useRouteParams,
    useServerAnalytics,
    ProductOptionsProvider,
    ShopifyAnalyticsConstants
  } from "@shopify/hydrogen";

import { MEDIA_FRAGMENT } from "~/lib/fragments";
import { getExcerpt } from "~/lib/utils";

import { Layout } from "~/components/Layout.server";
import { ProductGallery } from "~/components/product/ProductGallery.client";
import { Heading, Text, Section, ProductForm } from "~/components";

//   import ProductDetails from "../../components/ProductDetails.client";
  
  export default function Product() {
    const { handle } = useRouteParams();
    
    const {
        data: { product, shop },
    } = useShopQuery({
        query: PRODUCT_QUERY,
        variables: {
            handle
        },
        preload: true
    });


    useServerAnalytics({
        shopify: {
            pageType: ShopifyAnalyticsConstants.pageType.product,
            resourceId: product.id
        }
    })

    const {media, title, vendor, descriptionHtml, id} = product;
    // const {shippingPolicy, refundPolicy} = shop;
    return (
      <Layout>
        <ProductOptionsProvider data={product}>
          <Section padding="x" className="px-0">
            <div className="grid items-start md:gap-6 lg:gap-20 md:grid-cols-2 lg:grid-cols-3">
              <ProductGallery
                media={media.nodes}
                className="w-screen md:w-full lg:col-span-2"
              />
              <div className="sticky md:-mb-nav md:top-nav md:-translate-y-nav md:h-screen md:pt-nav hiddenScroll md:overflow-y-scroll">
              <section className="flex flex-col w-full max-w-xl gap-8 p-6 md:mx-auto md:max-w-sm md:px-0">
                <div className="grid gap-2">
                  <Heading as="h1" format className="whitespace-normal">
                    {title}
                  </Heading>
                  {vendor && (
                    <Text className={'opacity-50 font-medium'}>{vendor}</Text>
                  )}
                </div>
                {/* <ProductForm /> */}
              </section>
              </div>
            </div>
            
          </Section>
          
        </ProductOptionsProvider>
      </Layout>
    )
    
  }


  // return (
  //   <Layout>
  //     <Suspense>
  //         <Seo type="product" data={product} />
  //     </Suspense>
  //     <ProductOptionsProvider data={product}>
  //         <Section padding="x" className="px-0">
  //             <div className="grid items-start md:gap-6 lg:gap-20 md:grid-cols-2 lg:grid-cols-3">
  //                 <ProductGallery
  //                     media={media.nodes}
  //                     className="w-screen md:w-full lg:col-span-2"
  //                 />
  //                 <div className="sticky md:-mb-nav md:top-nav md:-translate-y-nav md:h-screen md:pt-nav hiddenScroll md:overflow-y-scroll">
  //                     <section className="flex flex-col w-full max-w-xl gap-8 p-6 md:mx-auto md:max-w-sm md:px-0">
  //                         <div className="grid gap-2">
  //                         <Heading as="h1" format className="whitespace-normal">
  //                             {title}
  //                         </Heading>
  //                         {vendor && (
  //                             <Text className={'opacity-50 font-medium'}>{vendor}</Text>
  //                         )}
  //                         </div>
  //                     </section>
  //                 </div>
  //             </div>
  //         </Section>
  //     </ProductOptionsProvider>
  //   </Layout>
  // );
const PRODUCT_QUERY = gql`
  ${MEDIA_FRAGMENT}
  query ProductDetails($handle: String!) {
    product(handle: $handle) {
      id
      title
      vendor
      descriptionHtml
      media(first: 7) {
        nodes {
          ...Media
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