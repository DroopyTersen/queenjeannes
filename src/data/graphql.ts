import useAsyncData from "../hooks/useAsyncData.js";
import { useEffect, useState } from "/web_modules/react.js";

const REPOSITORY = "queenjeannes";
const GRAPHQL_ENDPOINT = `https://${REPOSITORY}.prismic.io/graphql`;
const REST_ENDPOINT = `https://${REPOSITORY}.prismic.io/api/v2`;

let masterRef = "";

let waitForRef = (async () => {
  try {
    let { refs } = await fetch(REST_ENDPOINT).then(res => res.json());
    masterRef = refs.find(r => r.id === "master").ref;
  } catch (err) {
    console.error("Unable to set master ref");
  }
})();

export const gql = str => str;

let request = async function(query, queryOptions = {}) {
  let url = GRAPHQL_ENDPOINT + "?query=" + encodeURIComponent(query);
  await waitForRef;
  let result = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Prismic-ref": masterRef,
    },
    // spread the passed in queryOptions onto the POST body
  }).then(res => res.json());
  console.log("result", result);
  return result;
};

export interface QueryState<T> {
  data: T;
  error?: any;
}
export const useQuery = function<T>(query) {
  let [state, setState] = useState({ data: null });

  useEffect(() => {
    let isMounted = true;
    let doAsync = async () => {
      let result = await request(query);
      if (!isMounted) return;
      setState(result);
    };
    doAsync();
    return () => (isMounted = false);
  }, [query]);
  return state as QueryState<T>;
};
