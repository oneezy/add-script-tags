import { Layout, Page, SettingToggle, TextStyle } from "@shopify/polaris";
import { Query, Mutation, graphql, compose } from "react-apollo";
import gql from "graphql-tag";

import {
  QUERY_SCRIPTTAGS,
  WRITE_SCRIPTTAGS,
  DELETE_SCRIPTTAGS
} from "./queries";

function getScript(resp) {
  if (resp.data.scriptTags.edges.length > 0) {
    result = resp.data.scriptTags.edges[0];
  }

  return null;
}

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enabled: false,
      scriptId: "",
      loading: true
    };
  }

  componentWillReceiveProps(nextProps) {
    const { loading } = this.state;
    const { scriptTags = {} } = this.props;

    if (!nextProps.loading) {
      console.log("done loading");
      console.log("query scriptTags", nextProps.queryScripts.scriptTags);

      const { edges = [] } = nextProps.queryScripts.scriptTags;
      this.setState({
        loading: nextProps.loading,
        enabled: edges.length,
        scriptId: edges.length > 0 ? edges[0].node.id : ""
      });
    }
  }

  render() {
    const { enabled, loading } = this.state;
    const contentStatus = enabled ? "Disable" : "Enable";
    const textStatus = enabled ? "enabled" : "disabled";
    console.log("props", JSON.stringify(this.props.queryScripts));

    return (
      <Page>
        <Layout>
          <Layout.AnnotatedSection
            title="Add Script Tags"
            description="Adds custom script to shop"
          >
            {loading && <span> Loading... </span>}
            <SettingToggle
              action={{
                content: contentStatus,
                onAction: () => this.handleToggle()
              }}
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

  async handleToggle() {
    const { enabled, scriptId } = this.state;
    const { writeScript, deleteScript } = this.props;
    this.setState(
      {
        enabled: !enabled
      },
      async () => {
        if (this.state.enabled) {
          // Enable adding script from API
          const WRITE_SCRIPTTAGS_VARS = {
            variables: {
              input: {
                src:
                  "https://cdn.shopify.com/s/files/1/0318/4328/7085/files/script.js?4",
                displayScope: "ALL"
              }
            }
          };
          const resp = await writeScript(WRITE_SCRIPTTAGS_VARS);
          console.log("write resp", resp);
        } else {
          // Remove script from API
          console.log("scriptID", scriptId);
          const DELETE_SCRIPTTAGS_VARS = {
            variables: {
              id: scriptId
            }
          };
          const resp = await deleteScript(DELETE_SCRIPTTAGS_VARS);
          console.log("delete resp", resp);
        }
      }
    );
  }
}

export default compose(
  graphql(WRITE_SCRIPTTAGS, {
    name: "writeScript"
  }),
  graphql(DELETE_SCRIPTTAGS, {
    name: "deleteScript"
  }),
  graphql(QUERY_SCRIPTTAGS, {
    name: "queryScripts"
  })
)(Index);
