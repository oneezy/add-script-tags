import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import ProductItem from './ProductItem';

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

class Products extends Component {
  render() {
    return (
      <Fragment>
        <Query query={PRODUCTS_QUERY}>
          {
            ({ loading, error, data }) => {
              if(loading) return <h4>Loading...</h4>
              if(error) console.log(error);
              console.log(data.products.edges);
              return <Fragment>

              {
                data.products.edges.map(product => (
                  <ProductItem key={product.node.id} product={product.node} />
                ))
              }
              
              </Fragment>;
            }
          }
        </Query>
      </Fragment>
    )
  }
}

export default Products