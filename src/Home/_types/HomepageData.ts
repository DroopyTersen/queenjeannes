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

export interface HomepageData {
  homepage: HomepageData_homepage | null;
}
