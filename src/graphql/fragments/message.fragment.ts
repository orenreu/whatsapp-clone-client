import { gql } from '@apollo/client';

export default gql`
  fragment Message on Message {
    id
    createdAt
    content
  }
`;
