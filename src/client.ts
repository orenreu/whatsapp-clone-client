import { ApolloClient, InMemoryCache } from '@apollo/client';

const uri = process.env.REACT_APP_SERVER_URL + '/graphql';

const cache = new InMemoryCache();

export default new ApolloClient({
  uri,
  cache
});
