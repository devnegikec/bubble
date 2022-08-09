import { gql, useLocalization, useShopQuery } from '@shopify/hydrogen';

import { Hero } from '~/components/sections/Hero';
import { FeaturedCollections } from './sections/FeaturedCollections';
import { getHeroPlaceholder } from '~/lib/placeholders';
import { MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT } from '~/lib/fragments';

export function HomepageContent() {
    const {
      language: {isoCode: languageCode},
      country: {isoCode: countryCode},
    } = useLocalization();
  
    const {data} = useShopQuery({
      query: HOMEPAGE_CONTENT_QUERY,
      variables: {
        language: languageCode,
        country: countryCode,
      },
      preload: true,
    });
  
    const {heroBanners, featuredCollections, featuredProducts} = data;
  
    // fill in the hero banners with placeholders if they're missing
    const [primaryHero, secondaryHero, tertiaryHero] = getHeroPlaceholder(
      heroBanners.nodes,
    );
  
    return (
      <>
        {primaryHero && (
          <Hero {...primaryHero} height="full" top loading="eager" />
        )}
        {secondaryHero && <Hero {...secondaryHero} />}
        <FeaturedCollections
          data={featuredCollections.nodes}
          title="Collections"
        />
        {tertiaryHero && <Hero {...tertiaryHero} />}
      </>
    );
  }


const HOMEPAGE_CONTENT_QUERY = gql`
  ${MEDIA_FRAGMENT}
  ${PRODUCT_CARD_FRAGMENT}
  query homepage($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    heroBanners: collections(
      first: 3
      query: "collection_type:custom"
      sortKey: UPDATED_AT
    ) {
      nodes {
        id
        handle
        title
        descriptionHtml
        heading: metafield(namespace: "hero", key: "title") {
          value
        }
        byline: metafield(namespace: "hero", key: "byline") {
          value
        }
        cta: metafield(namespace: "hero", key: "cta") {
          value
        }
        spread: metafield(namespace: "hero", key: "spread") {
          reference {
            ...Media
          }
        }
        spreadSecondary: metafield(namespace: "hero", key: "spread_secondary") {
          reference {
            ...Media
          }
        }
      }
    }
    featuredCollections: collections(
      first: 3
      query: "collection_type:smart"
      sortKey: UPDATED_AT
    ) {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
    featuredProducts: products(first: 12) {
      nodes {
        ...ProductCard
      }
    }
  }
`;