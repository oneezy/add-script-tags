import { Layout, Page, SettingToggle, TextStyle } from "@shopify/polaris";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

class Index extends React.Component {
  state = { enabled: true };

  render() {
    const { enabled } = this.state;
    const contentStatus = enabled ? "Disable" : "Enable";
    const textStatus = enabled ? "enabled" : "disabled";

    return (
      <Page>
        <Layout>
          <Layout.AnnotatedSection
            title="Add Script Tags"
            description="Adds custom script to shop"
          >
            <SettingToggle
              action={{ content: contentStatus, onAction: this.handleToggle }}
              enabled={enabled}
            >
              <TextStyle>This setting is </TextStyle>
              <TextStyle variation="strong">{textStatus}</TextStyle>.
            </SettingToggle>
          </Layout.AnnotatedSection>
        </Layout>
      </Page>
    );
  }

  handleToggle = () => {
    this.setState(({ enabled }) => {
      return { enabled: !enabled };
    });
  };
}

export default Index;

/**
|--------------------------------------------------
| QUERIES AND MUTATIONS
|--------------------------------------------------
*/
const QUERY_SCRIPTTAGS = gql`
  query {
    scriptTags(first: 5) {
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
  }
`;

/***********************************************************************************
{
  "id": "gid://shopify/ScriptTag/110762885208"
}
************************************************************************************/
