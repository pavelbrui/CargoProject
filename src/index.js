
import './App.css';
import React from 'react'; 
import App from './App';
import client from './apolloClient';
import { ApolloProvider } from '@apollo/client';
import { LanguageProvider } from './LanguageContext';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <ApolloProvider client={client}>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </ApolloProvider>
);
