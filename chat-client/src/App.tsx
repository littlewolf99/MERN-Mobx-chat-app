import './styles/App.css';

import { Button, createMuiTheme, CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { amber, green, grey, red } from '@material-ui/core/colors';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { ISocket, Socket } from './common';
import { NoMatch } from './common/utils/NoMatch';
import { ProtectedRoute } from './common/utils/ProtectedRoute';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import logo from './logo.svg';
import { Chatroom } from './views/Chatroom';
import { ChatroomSelection } from './views/ChatroomSelection';
import { Home } from './views/Home';

export interface IChat {
  cleintId: string;
  userName: string;
  timestamp: Date;
  event?: string;
  message?: string;
}

export interface IUser {
  id: string;
  name: string;
}

export interface IAppState {
  chatroom?: IChatroom;
  client: ISocket;
  isRegisterInProcess: boolean;
  user?: IUser;
  name: string;
  room: string;
  chathistory: IChat[];
  theme: any;
}

export interface IChatroom {
  name: string;
}

const theme = createMuiTheme({
  palette: {
    primary: grey,
    secondary: amber,
    error: red,
    type: 'light'
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(',')
  }
});

const theme2 = createMuiTheme({
  palette: {
    primary: grey,
    secondary: green,
    error: red,
    type: 'dark'
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(',')
  }
});

class App extends React.Component {
  public state: IAppState;

  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      chathistory: [],
      chatroom: undefined,
      client: new Socket(),
      isRegisterInProcess: false,
      name: 'OlliMoll1',
      room: 'Room1',
      user: undefined,
      theme
    };

    // this.state.client.registerHandler((chat: IChat) => {
    //   console.log(chat);
    //   this.setState({ chathistory: this.state.chathistory.concat(chat) });
    // });
  }

  public render() {
    return (
      <MuiThemeProvider theme={this.state.theme}>
        <CssBaseline />
        <Navbar>
          <img src={logo} className="App-logo" alt="logo" />
        </Navbar>
        <Button variant="outlined" onClick={() => this.setState({ theme: this.state.theme === theme ? theme2 : theme })}>
          Switch theme
        </Button>
        <main className="main-container">
          <Switch>
            {/* TODO olli add valid protections to routes */}
            <Route exact path="/" component={Home} />
            <ProtectedRoute exact isAllowed={true} path="/chatrooms" component={ChatroomSelection} />
            <ProtectedRoute isAllowed={true} path="/chatroom/:id" component={Chatroom} />
            <Route component={NoMatch} />
          </Switch>
        </main>
        <Footer />
        {/* <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={() => this.register()}>Register</button>
        <button onClick={() => this.join(this.state.room)}>Join</button>
        <button onClick={() => this.leave(this.state.room)}>Leave</button>
        <button
          onClick={() =>
            this.state.client.message(this.state.room, 'Hei olen olli', (err: any, chats: IChat[]) => {
              console.log('viesti meni');
            })
          }
        >
          Send message
        </button>
        {this.state.chathistory.map((chat: IChat, i) => [
          <div key={i}>
            {chat.event
              ? `${chat.event} ${new Date(chat.timestamp).toString()}`
              : `${chat.userName} ${chat.message} ${new Date(chat.timestamp).toString()}`}
          </div>
        ])} */}
      </MuiThemeProvider>
    );
  }
  // private leave(room: string) {
  //   this.state.client.leave(room, (err: any, chats: IChat[]) => {
  //     this.setState({ chatroom: undefined });
  //   });
  // }

  // private join(room: string) {
  //   this.state.client.join(room, (err: any, chats: IChat[]) => {
  //     this.setState({ chatrooms: room });
  //     this.setState({ chathistory: chats });
  //   });
  // }

  // private register() {
  //   const onRegisterResponse = (user?: IUser) => this.setState({ isRegisterInProcess: false, user });
  //   this.setState({ isRegisterInProcess: true });
  //   this.state.client.register(this.state.name, (err: any, user: IUser) => {
  //     if (err) {
  //       return onRegisterResponse(undefined);
  //     }
  //     return onRegisterResponse(user);
  //   });
  // }
}

export default App;
