import React from 'react';
import { BrowserRouter, Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { ChatsListScreen, ChatRoomScreen } from './components/';
import AnimatedSwitch from './components/AnimatedSwitch';
import { useCacheService } from './services/cache.service';

const App: React.FC = () => {
  useCacheService();

  return (
    <BrowserRouter>
      <AnimatedSwitch>
        <Route exact path="/chats" component={ChatsListScreen} />
        <Route
          exact
          path="/chats/:chatId"
          component={({ match, history }: RouteComponentProps<{ chatId: string }>) => (
            <ChatRoomScreen chatId={match.params.chatId} history={history} />
          )}
        />
      </AnimatedSwitch>
      <Route exact path="/" render={() => <Redirect to="/chats" />} />
    </BrowserRouter>
  );
};

export default App;
