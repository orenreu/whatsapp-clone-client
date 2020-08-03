import { ApolloClient, InMemoryCache } from '@apollo/client';
import { split, HttpLink, ApolloLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const uri = process.env.REACT_APP_SERVER_URL + '/graphql';
const wsUri = uri.replace(/^https?/, 'ws');

const httpLink = new HttpLink({
  uri
});

const wsLink = new WebSocketLink({
  uri: wsUri,
  options: {
    reconnect: true
  }
});

export interface Definition {
  kind: string;
  operation?: string;
}

const terminatingLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink
);

const link = ApolloLink.from([terminatingLink]);

const cache = new InMemoryCache();

export default new ApolloClient({
  link,
  cache
});
