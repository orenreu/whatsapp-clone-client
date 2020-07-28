import React from 'react';
import ChatsList from './ChatsList';
import ChatsNavbar from './ChatsNavbar';
import styled from 'styled-components';
import { History } from 'history';

const Container = styled.div`
  height: 100vh;
`;

interface ChatsListScreenProps {
  history: History;
}

const ChatsListScreen: React.FC<ChatsListScreenProps> = ({ history }) => (
  <div>
    <Container>
      <ChatsNavbar />
      <ChatsList {...{ history }} />
    </Container>
  </div>
);

export default ChatsListScreen;
