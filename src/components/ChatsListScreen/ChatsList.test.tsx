import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { cleanup, render, waitFor, fireEvent, screen } from '@testing-library/react';
import ChatsList from './ChatsList';
import * as queries from '../../graphql/queries';
import { createMemoryHistory } from 'history';

describe('ChatsList', () => {
  afterEach(() => {
    cleanup();

    delete window.location;
    window = Object.create(window);
    Object.defineProperty(window, 'location', {
      value: {
        href: '/'
      },
      writable: true
    });
  });

  const mocks = [
    {
      request: {
        query: queries.chats
      },
      result: {
        data: {
          chats: [
            {
              __typename: 'Chat',
              id: 1,
              name: 'Foo Bar',
              picture: 'https://localhost:4000/picture.jpg',
              lastMessage: {
                __typename: 'Message',
                id: 1,
                content: 'Hello',
                createdAt: new Date('1 Jan 2019 GMT'),
                isMine: true,
                chat: {
                  __typename: 'Chat',
                  id: 1
                }
              }
            }
          ]
        }
      }
    }
  ];

  it('renders fetched chats data', async () => {
    const history = createMemoryHistory();

    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ChatsList history={history} />
      </MockedProvider>
    );

    await waitFor(() => screen.getByTestId('name'));

    expect(getByTestId('name')).toHaveTextContent('Foo Bar');
    expect(getByTestId('picture')).toHaveAttribute('src', 'https://localhost:4000/picture.jpg');
    expect(getByTestId('content')).toHaveTextContent('Hello');
    expect(getByTestId('date')).toHaveTextContent('02:00');
  });

  it('should navigate to the target chat room on chat item click', async () => {
    const history = createMemoryHistory();

    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ChatsList history={history} />
      </MockedProvider>
    );

    await waitFor(() => screen.getByTestId('chat'));
    fireEvent.click(getByTestId('chat'));
    await waitFor(() => expect(history.location.pathname).toEqual('chats/1'));
  });
});
