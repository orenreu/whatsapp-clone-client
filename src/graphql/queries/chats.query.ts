import { gql } from '@apollo/client';
import * as fragments from '../fragments';

export default gql`
  query Chats {
    chats {
      ...Chat
    }
  }
  ${fragments.chat}
`;
