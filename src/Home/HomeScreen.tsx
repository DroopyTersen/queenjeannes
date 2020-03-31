import React from "/web_modules/react.js";
import useHomepage from "./useHome.js";
import useWindowSize from "../hooks/useWindowSize.js";

export default function HomeScreen() {
  let { banner, bannerMobile, tagline, callsToAction } = useHomepage();
  let { width } = useWindowSize();
  console.log("TAGLINE", tagline);
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
    </div>
  );
}
