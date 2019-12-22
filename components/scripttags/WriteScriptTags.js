import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

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
  }
`;

/********************************************************************************************************************
{
  "input": {
    "src": "https://raw.githack.com/oneezy/add-script-tags/master/pages/script.js", "displayScope": "ONLINE_STORE" 
  }
}
*********************************************************************************************************************/

class WriteScriptTags extends Component {
  render() {
    return (
      <Fragment>
        <Mutation mutation={WRITE_SCRIPTTAGS}>
          {scriptTagCreate  => <button onClick={scriptTagCreate}>Add Script Tags</button> }
        </Mutation>
      </Fragment>
    )
  }
}

export default WriteScriptTags