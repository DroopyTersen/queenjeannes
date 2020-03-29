/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NavigationData
// ====================================================

export interface NavigationData_navigation_body_NavigationBodyMenu_link_primary {
  __typename: "NavigationBodyMenu_linkPrimary";
  label: string | null;
  path: string | null;
}

export interface NavigationData_navigation_body_NavigationBodyMenu_link {
  __typename: "NavigationBodyMenu_link";
  type: string | null;
  primary: NavigationData_navigation_body_NavigationBodyMenu_link_primary | null;
}

export interface NavigationData_navigation_body_NavigationBodySocial_media_primary {
  __typename: "NavigationBodySocial_mediaPrimary";
  name: string | null;
  link: string | null;
}

export interface NavigationData_navigation_body_NavigationBodySocial_media {
  __typename: "NavigationBodySocial_media";
  type: string | null;
  primary: NavigationData_navigation_body_NavigationBodySocial_media_primary | null;
}

export type NavigationData_navigation_body = NavigationData_navigation_body_NavigationBodyMenu_link | NavigationData_navigation_body_NavigationBodySocial_media;

export interface NavigationData_navigation {
  __typename: "Navigation";
  title: any | null;
  logo: any | null;
  body: NavigationData_navigation_body[] | null;
}

export interface NavigationData {
  navigation: NavigationData_navigation | null;
}
