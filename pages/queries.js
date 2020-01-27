import gql from "graphql-tag";
/**
|--------------------------------------------------
| QUERIES AND MUTATIONS
|--------------------------------------------------
*/
export const QUERY_SCRIPTTAGS = gql`
  query {
    scriptTags(first: 1) {
      edges {
        node {
          id
          src
          displayScope
        }
      }
    }
  }
`;

export const WRITE_SCRIPTTAGS = gql`
  mutation scriptTagCreate($input: ScriptTagInput!) {
    scriptTagCreate(input: $input) {
      userErrors {
        field
        message
      }
      scriptTag {
        id
        src
        displayScope
      }
    }
  }
`;

/***********************************************************************************
{
  "input": {
    "src": "https://raw.githack.com/oneezy/add-script-tags/master/pages/script.js",
    "displayScope": "ONLINE_STORE"
  }
}
************************************************************************************/

export const DELETE_SCRIPTTAGS = gql`
  mutation scriptTagDelete($id: ID!) {
    scriptTagDelete(id: $id) {
      deletedScriptTagId
      userErrors {
        field
        message
      }
    }
  }
`;

/***********************************************************************************
{
  "id": "gid://shopify/ScriptTag/110762885208"
}
************************************************************************************/
