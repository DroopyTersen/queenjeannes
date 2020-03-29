import React from "/web_modules/react.js";
import "./data/graphql.js";
import { gql, useQuery } from "./data/graphql.js";
import { NavigationData } from "./__generated__/NavigationData.js";

function App({}) {
  let { data } = useQuery<NavigationData>(NAVIGATION_QUERY);
  if (data) {
    console.log(
      "Navigation",
      data.navigation.body.filter(l => l.type === "menu_link")
    );
  }
  return (
    <div className="app">
      <h1>App Updated!</h1>
    </div>
  );
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

export default App;
