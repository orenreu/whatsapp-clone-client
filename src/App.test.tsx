import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MockedProvider } from '@apollo/client/testing';
import * as subscriptions from './graphql/subscriptions';

const mocks = [
  {
    request: { query: subscriptions.messageAdded },
    result: { data: {} }
  }
];

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <MockedProvider mocks={mocks}>
      <App />
    </MockedProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
