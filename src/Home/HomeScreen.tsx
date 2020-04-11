import React from "/web_modules/react.js";
import useHomepage, { CallToAction } from "./useHome.js";
import useWindowSize from "../hooks/useWindowSize.js";
import BakedGoodRows from "../BakedGoods/BakedGoodRows.js";
import AboutUs from "../AboutUs/AboutUs.js";
import ContactForm from "../Forms/ContactForm.js";

export default function HomeScreen() {
  let { banner, bannerMobile, tagline, callsToAction } = useHomepage();
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
      {isMobile && <p className="tagline">{tagline}</p>}
      <div className="cta__wrapper">
        <div className="cta">
          {!isMobile && <p className="tagline">{tagline}</p>}
          <p>
            I want options for as many people as possible. That’s my vision, and that’s where we’re
            starting!
          </p>
          <div>
            <button
              onClick={() => document.getElementById("order-form").scrollIntoView()}
              className="button"
            >
              Request an Order
            </button>
          </div>
        </div>
      </div>
      <BakedGoodRows isMobile={isMobile} />
      <ContactForm title="Request an Order" />
      <hr />
      <AboutUs />
      {/* <CallsToAction items={callsToAction} /> */}
    </div>
  );
}

function CallsToAction({ items }: { items: CallToAction[] }) {
  return <div className="calls-to-actions"></div>;
}
