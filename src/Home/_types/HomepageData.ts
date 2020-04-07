/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HomepageData
// ====================================================

export interface HomepageData_homepage_body_primary {
  __typename: "HomepageBodyCall_to_actionPrimary";
  title: any | null;
  path: string | null;
  image: any | null;
}

export interface HomepageData_homepage_body {
  __typename: "HomepageBodyCall_to_action";
  type: string | null;
  primary: HomepageData_homepage_body_primary | null;
}

export interface HomepageData_homepage {
  __typename: "Homepage";
  banner: any | null;
  tagline: any | null;
  body: HomepageData_homepage_body[] | null;
}

export interface HomepageData_allBaked_goodss_edges_node_body_primary {
  __typename: "Baked_goodsBodyBaked_itemPrimary";
  title: any | null;
  description: any | null;
  thumbnail: any | null;
}

export interface HomepageData_allBaked_goodss_edges_node_body_fields {
  __typename: "Baked_goodsBodyBaked_itemFields";
  images: any | null;
}

export interface HomepageData_allBaked_goodss_edges_node_body {
  __typename: "Baked_goodsBodyBaked_item";
  primary: HomepageData_allBaked_goodss_edges_node_body_primary | null;
  fields: HomepageData_allBaked_goodss_edges_node_body_fields[] | null;
}

export interface HomepageData_allBaked_goodss_edges_node {
  __typename: "Baked_goods";
  description: any | null;
  body: HomepageData_allBaked_goodss_edges_node_body[] | null;
}

export interface HomepageData_allBaked_goodss_edges {
  __typename: "Baked_goodsConnectionEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomepageData_allBaked_goodss_edges_node;
}

export interface HomepageData_allBaked_goodss {
  __typename: "Baked_goodsConnectionConnection";
  /**
   * A list of edges.
   */
  edges: (HomepageData_allBaked_goodss_edges | null)[] | null;
}

export interface HomepageData {
  homepage: HomepageData_homepage | null;
  allBaked_goodss: HomepageData_allBaked_goodss;
}
