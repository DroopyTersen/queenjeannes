import React from "/web_modules/react.js";
import { gql, useQuery } from "../data/graphql.js";
import { BakedGoodsData } from "./_types/BakedGoodsData.js";

export default function BakedGoodRows({ isMobile = false }: { isMobile: boolean }) {
  let { bakedGoods } = useBakedGoods();
  if (!bakedGoods) return null;
  return (
    <div className="baked-goods">
      <h1 className="link-target" id="baked-goods">
        Baked Goods
      </h1>
      <p>{bakedGoods.description}</p>
      <div className="baked-goods-list">
        {bakedGoods.items.map((bakedGood, index) => {
          if (isMobile)
            return (
              <div className="baked-good baked-good-info">
                <h2>{bakedGood.title}</h2>
                <img src={bakedGood.images[0]} />
                <img src={bakedGood.images[1]} />
                <div className="baked-good-cta">
                  <button type="button" onClick={() => alert("Coming soon!")}>
                    See More
                  </button>
                </div>
              </div>
            );
          return (
            <div className="baked-good">
              {index % 2 === 0 && <BakedGoodInfo title={bakedGood.title} />}
              <img src={bakedGood.images[0]} />
              <img src={bakedGood.images[1]} />
              {index % 2 === 1 && <BakedGoodInfo title={bakedGood.title} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BakedGoodInfo({ title }) {
  return (
    <div className="baked-good-info">
      <h2>{title}</h2>
      <button type="button">See More</button>
    </div>
  );
}

export function useBakedGoods() {
  let { data } = useQuery<BakedGoodsData>(QUERY);
  if (!data) return {};

  let bakedGoods: { items: BakedGood[]; description: string } = {
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
    bakedGoods,
  };
}

export interface BakedGood {
  title: string;
  description: any;
  thumbnail: string;
  images: string[];
}

const QUERY = gql`
  query BakedGoodsData {
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
