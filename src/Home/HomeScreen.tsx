import React from "/web_modules/react.js";
import useHomepage, { BakedGood, CallToAction } from "./useHome.js";
import useWindowSize from "../hooks/useWindowSize.js";

export default function HomeScreen() {
  let { banner, bannerMobile, tagline, bakedGoods, callsToAction } = useHomepage();
  console.log("HomeScreen -> bakedGoods", bakedGoods);
  let { width } = useWindowSize();
  const isMobile = width < 1000;
  if (!banner) return null;
  return (
    <div className="home content">
      <div className="hero">
        <div
          className="hero-image"
          style={{ backgroundImage: `url('${isMobile ? bannerMobile : banner}')` }}
        ></div>
        <div className="hero-caption">
          <div className="title queen">Queen</div>
          <div className="title">Jeanne's</div>
          <div className="subtitle">- Gluten Free Bakery -</div>
        </div>
      </div>
      <p className="tagline">{tagline}</p>
      {/* <CallsToAction items={callsToAction} /> */}
      <BakedGoods
        items={bakedGoods.items}
        description={bakedGoods.description}
        isMobile={isMobile}
      />
    </div>
  );
}

function CallsToAction({ items }: { items: CallToAction[] }) {
  return <div className="calls-to-actions"></div>;
}
function BakedGoods({
  items,
  description = "",
  isMobile = false,
}: {
  items: BakedGood[];
  description: string;
  isMobile: boolean;
}) {
  return (
    <div className="baked-goods">
      <h1 id="baked-goods">Baked Goods</h1>
      <p>{description}</p>
      <div className="baked-goods-list">
        {items.map((bakedGood, index) => {
          if (isMobile)
            return (
              <div className="baked-good baked-good-info">
                <h2>{bakedGood.title}</h2>
                <img src={bakedGood.images[0]} />
                <img src={bakedGood.images[1]} />
                <div className="baked-good-cta">
                  <button type="button">See More</button>
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
