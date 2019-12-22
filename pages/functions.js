import "isomorphic-fetch";
import { gql } from "apollo-boost";

export function test() {
  alert('test');
}

export function QUERY_SCRIPTTAGS(url) {
  return gql`
    query {
      scriptTags(first: 5 ){
        edges {
          node {
            id
            src
            displayScope
          }
        }
      }
    }`;
}

export function WRITE_SCRIPTTAGS(url) {
  return gql`
    mutation scriptTagCreate($input: ScriptTagInput!) {
      scriptTagCreate(input: $input) {
        userErrors {
          field
          message
        }
        scriptTag {
          src
          displayScope
        }
      }
    }`;
}

/***********************************************************************************
{
  "input": {"src": "https://raw.githack.com/oneezy/add-script-tags/master/pages/script.js", "displayScope": "ONLINE_STORE" }
}
************************************************************************************/

export function DELETE_SCRIPTTAGS(url) {
  return gql`
    mutation scriptTagDelete($id: ID!) {
      scriptTagDelete(id: $id) {
        deletedScriptTagId
        userErrors {
          field
          message
        }
      }
    }`;
}

/***********************************************************************************
{
  "id": "gid://shopify/ScriptTag/110640234584"
}
************************************************************************************/
