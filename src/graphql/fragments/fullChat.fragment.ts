import { gql } from '@apollo/client';
import chat from './chat.fragment';
import message from './message.fragment';

export default gql`
  fragment FullChat on Chat {
    ...Chat
    messages {
      ...Message
    }
  }
  ${chat}
  ${message}
`;
