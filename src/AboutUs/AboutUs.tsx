import React from "/web_modules/react.js";
import { gql, useQuery } from "../data/graphql.js";
import { AboutUsData } from "./_types/AboutUsData.js";
import Prismic from "/web_modules/prismic-reactjs.js";
console.log("Prismic", Prismic);

export default function AboutUs() {
  let { title, content, blurb, banner } = useAboutUs();
  return (
    <div className="about-us">
      <h1 id="about-us">{title}</h1>
      <div className="about-us__banner">
        <img src={banner} />
      </div>
      <p className="tagline">{blurb}</p>
      <div className="content about-us__content">
        <Prismic.RichText render={content} />
      </div>
    </div>
  );
}

export function useAboutUs() {
  let { data } = useQuery<AboutUsData>(QUERY);
  if (!data) return {};

  try {
    let title = data.about_us.title[0].text;
    let blurb = data.about_us.blurb[0].text;
    let banner = data.about_us.banner.url;
    let content = data.about_us.content;

    return {
      title,
      blurb,
      banner,
      content,
    };
  } catch (err) {
    console.log("Unable to parse About us");
    return {};
  }
}

const QUERY = gql`
  query AboutUsData {
    about_us(uid: "about-us", lang: "en-us") {
      title
      banner
      blurb
      content
    }
  }
`;
