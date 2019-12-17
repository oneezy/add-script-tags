import { Button, Card, Form, FormLayout, Layout, Page, SettingToggle, Stack, TextField, TextStyle } from '@shopify/polaris';

class Index extends React.Component {
  state = {
    enabled: false,
  };

  render() {
    const { enabled } = this.state;
    const contentStatus = enabled ? 'Disable' : 'Enable';
    const textStatus = enabled ? 'enabled' : 'disabled';

    return (
      <Page>
        <Layout>
          <Layout.AnnotatedSection
            title="Add Script Tags"
            description="Adds custom script to Product Page"
          >
            <SettingToggle
              action={{
                content: contentStatus,
                onAction: this.handleToggle,
              }}
              enabled={enabled}
            >
              This setting is{' '}
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