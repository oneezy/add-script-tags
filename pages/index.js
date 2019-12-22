import { Button, Card, Form, FormLayout, Layout, Page, SettingToggle, Stack, TextField, TextStyle } from '@shopify/polaris';
import Products from '../components/products/Products';
import WriteScriptTags from '../components/scripttags/WriteScriptTags';

class Index extends React.Component {
  state = { enabled: true };

  render() {
    const { enabled } = this.state;
    const contentStatus = enabled ? 'Disable' : 'Enable';
    const textStatus = enabled ? 'enabled' : 'disabled';

    return (
      <Page>
        <Layout>
          <Layout.AnnotatedSection title="Add Script Tags" description="Adds custom script to shop">
            <SettingToggle action={{ content: contentStatus, onAction: this.handleToggle }} enabled={enabled}>
              <TextStyle>This setting is{' '}</TextStyle>
              <TextStyle variation="strong">{textStatus}</TextStyle>.
            </SettingToggle>
          </Layout.AnnotatedSection>
        </Layout>
        {/* <WriteScriptTags /> */}
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