import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";
import TopBar from "./menu/TopBar";
import MainPage from "./Components/MainPage";
import GameSummary from "./Components/GameSummary";
import GamesPage from "./Components/GamesPage";
import LoginPage from "./Components/LoginPage";
import CreateAccountPage from "./Components/CreateAccountPage";
import ListsPage from "./Components/ListsPage";
import {useEffect, useState} from "react";
import API from "./API_Interface/API_Interface";

const customTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#072d42",
    },
    secondary: {
      main: "#ffffff",
    }
  },

  components: {
    MuiButton: {
      styleOverrides: {
        text: {
          color: "#ffffff"
        },
        outlined: {
          color: "#ffffff",
          borderColor: "#bfbfbf",
          size: "small"
        }
      }
    },
    MuiAppBar: {
      defaultProps: {
        enableColorOnDark: true,
      }
    }
  }
});

const logout = (setUser) => {
  return () => {
    setUser(undefined);
  }
};

function App() {
  const [user, setUser] = useState(undefined);
  const [lists, setLists] = useState([]);

  useEffect( () => {
    const api = new API();

    async function getLists() {
      const listsJSONString = await api.getAllLists(user);
      console.log(`lists: ${JSON.stringify(listsJSONString)}`);
      setLists(listsJSONString.data);
    }

    getLists();
  }, [user]);

  return (
      <Router>
        <ThemeProvider theme={customTheme}>
          <CssBaseline />
            <TopBar user={user} logoutAction={logout(setUser)}/>
            <Switch>
              <Route exact path="/">
                <MainPage />
              </Route>
              <Route exact path="/games">
                <GamesPage lists={lists}/>
              </Route>
              <Route exact path="/games/:gameID">
                <GameSummary lists={lists}/>
              </Route>
              <Route exact path="/login">
                <LoginPage setUser={setUser}/>
              </Route>
              <Route exact path="/create-account">
                <CreateAccountPage />
              </Route>
              <Route exact path="/lists">
                <ListsPage lists={lists} setLists={setLists}/>
              </Route>
            </Switch>
        </ThemeProvider>
      </Router>
  );
}

export default App;
