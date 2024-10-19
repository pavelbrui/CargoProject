import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import client from './apolloClient';
import { ApolloProvider } from '@apollo/client';
import { LanguageProvider } from './LanguageContext';

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <LanguageProvider>
    <App />
    </LanguageProvider>
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);
