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

  return {
    banner: data.homepage.banner.url,
    tagline: data.homepage.tagline.text,
    callsToAction,
  };
}

export interface CallToAction {
  title: string;
  image: string;
  path: string;
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
          body {
            ... on Baked_goodsBodyBaked_item {
              primary {
                title
                description
                thumbnail
              }
            }
          }
        }
      }
    }
  }
`;
