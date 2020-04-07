import { gql, useQuery } from "../data/graphql.js";
import { HomepageData } from "./_types/HomepageData";

export default function useHomepage() {
  let { data } = useQuery<HomepageData>(HOME_QUERY);
  if (!data) return {};

  let callsToAction: CallToAction[] = data.homepage.body
    .filter((c) => c.type === "call_to_action")
    .map((c) => ({
      title: c.primary.title.text,
      image: c.primary.image.url,
      path: c.primary.path,
    }));

  let bakedGoods = {
    items: [],
    description: "",
  };
  try {
    bakedGoods.description = data.allBaked_goodss.edges[0].node.description[0].text;
    bakedGoods.items = data.allBaked_goodss.edges[0].node.body.map((item) => {
      return {
        title: item.primary.title[0].text,
        thumbnail: item.primary.thumbnail.thumbnail.url,
        description: item.primary.description,
        images: item?.fields?.map((i) => i?.images["preview-tall"]?.url),
      };
    });
  } catch (err) {
    console.log("Unable to parse baked goods", err);
  }
  return {
    banner: data.homepage.banner.url,
    bannerMobile: data.homepage.banner.mobile.url,
    tagline: data.homepage.tagline[0].text,
    callsToAction,
    bakedGoods,
  };
}

export interface CallToAction {
  title: string;
  image: string;
  path: string;
}

export interface BakedGood {
  title: string;
  description: any;
  thumbnail: string;
  images: string[];
}

const HOME_QUERY = gql`
  query HomepageData {
    homepage(uid: "homepage", lang: "en-us") {
      banner
      tagline
      body {
        ... on HomepageBodyCall_to_action {
          type
          primary {
            title
            path
            image
          }
        }
      }
    }
    allBaked_goodss {
      edges {
        node {
          description
          body {
            ... on Baked_goodsBodyBaked_item {
              primary {
                title
                description
                thumbnail
              }
              fields {
                images
              }
            }
          }
        }
      }
    }
  }
`;
