import { gql } from '@apollo/client';
import message from './message.fragment';

export default gql`
  fragment Chat on Chat {
    id
    name
    picture
    lastMessage {
      ...Message
    }
  }
  ${message}
`;
