import React from "/web_modules/react.js";
import useHomepage from "./useHome.js";

export default function HomeScreen() {
  let { banner, tagline, callsToAction } = useHomepage();
  if (!banner) return null;
  return (
    <div className="home content">
      <div className="hero-image" style={{ backgroundImage: `url('${banner}')` }}></div>
    </div>
  );
}
