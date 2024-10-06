import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://airy-empathy-production.up.railway.app/graphql', // Adres Twojego backendu
  cache: new InMemoryCache(),
});

export default client;
