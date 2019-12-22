import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import App, { Container } from "next/app";
import { AppProvider } from "@shopify/polaris";
import { Provider } from "@shopify/app-bridge-react";
import Cookies from "js-cookie";
import "@shopify/polaris/styles.css";
import "oneezy-css/dist/oneezy-css.min.css";
import translations from "@shopify/polaris/locales/en.json";
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const client = new ApolloClient({
  fetchOptions: {
    credentials: "include"
  }
});

const PRODUCTS_QUERY = gql`
  query {
    products(first: 5) {
      edges {
        node {
          id
          title
          description
        }
      }
    }
  }
`;

client.query({
  query: PRODUCTS_QUERY
}).then(res => console.log(res));

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    const shopOrigin = Cookies.get("shopOrigin");
    return (
      <Container>
        <AppProvider i18n={translations}>
          <Provider
            config={{
              apiKey: API_KEY,
              shopOrigin: shopOrigin,
              forceRedirect: true
            }}
          >
            <ApolloProvider client={client}>
              <Component {...pageProps} />
            </ApolloProvider>
          </Provider>
        </AppProvider>
      </Container>
    );
  }
}

export default MyApp;
