import React from "/web_modules/react.js";
import "./data/graphql.js";
import { gql, useQuery } from "./data/graphql.js";

function App({}) {
  let result = useQuery(NAVIGATION_QUERY);
  console.log("Navigation", result);
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
          primary {
            label
            path
          }
        }
        ... on NavigationBodySocial_media {
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
