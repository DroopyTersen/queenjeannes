import React from "/web_modules/react.js";
import { gql, useQuery } from "../data/graphql.js";
import {
  NavigationData,
  NavigationData_navigation_body_NavigationBodyMenu_link_primary as MenuLink,
  NavigationData_navigation_body_NavigationBodySocial_media_primary as Social,
} from "./_types/NavigationData.js";

function Header({}) {
  let { logo, menuLinks, socials } = useNavigation();
  let [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="header">
      <div className="logo">
        <a href="/">
          <i className="fas fa-crown" />
        </a>
        <h1 className="logo-title">Queen Jeanne's Bakery</h1>
      </div>

      <div className="menu-trigger">
        <button className="button-clear" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {!isMenuOpen && <i className="fas fa-bars"></i>}
          {isMenuOpen && <i className="fas fa-times"></i>}
        </button>
      </div>
      <nav className={isMenuOpen ? "open" : "closed"}>
        <h1 className="logo-title">Queen Jeanne's Bakery</h1>

        {menuLinks &&
          menuLinks.map((link) => (
            <a className="nav-item" href={link.path}>
              {link.label}
            </a>
          ))}
      </nav>
    </header>
  );
}

export default React.memo(Header);

function useNavigation() {
  // console.log("useNavigation -> NAVIGATION_QUERY", NAVIGATION_QUERY);
  let { data } = useQuery<NavigationData>(NAVIGATION_QUERY);

  if (!data) return {};
  return {
    logo: data.navigation.logo.url + "",
    menuLinks: data.navigation.body
      .filter((l) => l.type === "menu_link")
      .map((ml) => ml.primary) as MenuLink[],
    socials: data.navigation.body
      .filter((l) => l.type === "social_media")
      .map((ml) => ml.primary) as Social[],
  };
}

const NAVIGATION_QUERY = gql`
  query NavigationData {
    navigation(uid: "navigation", lang: "en-us") {
      title
      logo
      body {
        ... on NavigationBodyMenu_link {
          type
          primary {
            label
            path
          }
        }
        ... on NavigationBodySocial_media {
          type
          primary {
            name
            link
          }
        }
      }
    }
  }
`;
