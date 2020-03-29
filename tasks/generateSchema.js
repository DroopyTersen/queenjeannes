const fetch = require("isomorphic-fetch");
const fs = require("fs");
const path = require("path");
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

const main = async () => {
  try {
    const res = await request(INTROSPECTION_QUERY);

    if (res.data) {
      const schema = JSON.stringify(res.data);
      // Specify where the schema should be written to
      fs.writeFileSync(path.resolve(__dirname, "../schema.json"), schema);
    } else {
      throw new Error("No Data");
    }
    process.exit();
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

const INTROSPECTION_QUERY = `
query IntrospectionQuery {
  __schema {
    queryType {
      name
    }
    mutationType {
      name
    }
    subscriptionType {
      name
    }
    types {
      ...FullType
    }
    directives {
      name
      description
      locations
      args {
        ...InputValue
      }
    }
  }
}

fragment FullType on __Type {
  kind
  name
  description
  fields(includeDeprecated: true) {
    name
    description
    args {
      ...InputValue
    }
    type {
      ...TypeRef
    }
    isDeprecated
    deprecationReason
  }
  inputFields {
    ...InputValue
  }
  interfaces {
    ...TypeRef
  }
  enumValues(includeDeprecated: true) {
    name
    description
    isDeprecated
    deprecationReason
  }
  possibleTypes {
    ...TypeRef
  }
}

fragment InputValue on __InputValue {
  name
  description
  type {
    ...TypeRef
  }
  defaultValue
}

fragment TypeRef on __Type {
  kind
  name
  ofType {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
              }
            }
          }
        }
      }
    }
  }
}
`;

main();
