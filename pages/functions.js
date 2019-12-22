import "isomorphic-fetch";
import { gql } from "apollo-boost";

export function test() {
  alert('test');
}

const QUERY_SCRIPTTAGS = gql`
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


const WRITE_SCRIPTTAGS = gql`
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

/***********************************************************************************
{
  "input": {
    "src": "https://raw.githack.com/oneezy/add-script-tags/master/pages/script.js", 
    "displayScope": "ONLINE_STORE" 
  }
}
************************************************************************************/

const DELETE_SCRIPTTAGS = gql`
mutation scriptTagDelete($id: ID!) {
  scriptTagDelete(id: $id) {
    deletedScriptTagId
    userErrors {
      field
      message
    }
  }
}`;

/***********************************************************************************
{
  "id": "gid://shopify/ScriptTag/110762885208"
}
************************************************************************************/