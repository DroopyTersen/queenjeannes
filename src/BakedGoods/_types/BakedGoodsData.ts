/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BakedGoodsData
// ====================================================

export interface BakedGoodsData_allBaked_goodss_edges_node_body_primary {
  __typename: "Baked_goodsBodyBaked_itemPrimary";
  title: any | null;
  description: any | null;
  thumbnail: any | null;
}

export interface BakedGoodsData_allBaked_goodss_edges_node_body_fields {
  __typename: "Baked_goodsBodyBaked_itemFields";
  images: any | null;
}

export interface BakedGoodsData_allBaked_goodss_edges_node_body {
  __typename: "Baked_goodsBodyBaked_item";
  primary: BakedGoodsData_allBaked_goodss_edges_node_body_primary | null;
  fields: BakedGoodsData_allBaked_goodss_edges_node_body_fields[] | null;
}

export interface BakedGoodsData_allBaked_goodss_edges_node {
  __typename: "Baked_goods";
  description: any | null;
  body: BakedGoodsData_allBaked_goodss_edges_node_body[] | null;
}

export interface BakedGoodsData_allBaked_goodss_edges {
  __typename: "Baked_goodsConnectionEdge";
  /**
   * The item at the end of the edge.
   */
  node: BakedGoodsData_allBaked_goodss_edges_node;
}

export interface BakedGoodsData_allBaked_goodss {
  __typename: "Baked_goodsConnectionConnection";
  /**
   * A list of edges.
   */
  edges: (BakedGoodsData_allBaked_goodss_edges | null)[] | null;
}

export interface BakedGoodsData {
  allBaked_goodss: BakedGoodsData_allBaked_goodss;
}
