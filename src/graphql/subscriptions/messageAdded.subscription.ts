import { gql } from '@apollo/client';
import * as fragments from '../fragments';

export default gql`
  subscription MessageAdded {
    messageAdded {
      ...Message
    }
  }
  ${fragments.message}
`;
