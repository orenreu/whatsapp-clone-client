import { DataProxy, defaultDataIdFromObject } from '@apollo/client';
import * as fragments from '../graphql/fragments';
import * as queries from '../graphql/queries';
import { MessageFragment, useMessageAddedSubscription, ChatsQuery } from '../graphql/types';

type Client = Pick<DataProxy, 'readFragment' | 'writeFragment' | 'readQuery' | 'writeQuery'>;

export const writeMessage = (client: Client, message: MessageFragment) => {
  type FullChat = { [key: string]: any };
  let fullChat;

  const chatIdFromStore = defaultDataIdFromObject(message.chat!);

  if (chatIdFromStore === null) {
    return;
  }
  try {
    fullChat = client.readFragment<FullChat>({
      id: chatIdFromStore,
      fragment: fragments.fullChat,
      fragmentName: 'FullChat'
    });
  } catch (e) {
    return;
  }

  if (fullChat === null || fullChat.messages === null) {
    return;
  }
  if (fullChat.messages.some((m: any) => m.id === message.id)) return;

  const newData = {
    ...fullChat,
    messages: [...fullChat.messages, message],
    lastMessage: message
  };

  client.writeFragment({
    id: chatIdFromStore,
    fragment: fragments.fullChat,
    fragmentName: 'FullChat',
    data: newData
  });

  let data;
  try {
    data = client.readQuery<ChatsQuery>({
      query: queries.chats
    });
  } catch (e) {
    return;
  }

  if (!data || data === null) {
    return null;
  }
  if (!data.chats || data.chats === undefined) {
    return null;
  }
  const chats = data.chats;

  const chatIndex = chats.findIndex((c: any) => {
    if (message === null || message.chat === null) return -1;
    return c.id === message?.chat?.id;
  });
  if (chatIndex === -1) return;
  const chatWhereAdded = chats[chatIndex];

  // The chat will appear at the top of the ChatsList component
  const newChats = [chatWhereAdded, ...chats.slice(0, chatIndex), ...chats.slice(chatIndex + 1)];

  client.writeQuery({
    query: queries.chats,
    data: { chats: newChats }
  });
};

export const useCacheService = () => {
  useMessageAddedSubscription({
    onSubscriptionData: ({ client, subscriptionData: { data } }) => {
      if (data) {
        writeMessage(client, data.messageAdded);
      }
    }
  });
};