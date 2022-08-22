import { Suspense } from "react";

import {
  gql,
  Seo,
  CacheLong,
  useShopQuery,
  useLocalization,
  useServerAnalytics,
  ShopifyAnalyticsConstants
} from "@shopify/hydrogen";

import { MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT } from "~/lib/fragments";
// import FeaturedCollections from "../components/FeaturedCollections.server";
import { HomepageContent } from "../components/HomePageContent.server";
import { Layout } from "~/components/index.server";

export default function Home() {
  return (
    <Layout>
      <Suspense>
        <HomepageContent />
      </Suspense>
    </Layout>
  );
}
