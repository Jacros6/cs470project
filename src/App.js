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
        <div style={testbackground}>
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
        </div>
        </Router>

  );
}

export default App;
const testbackground={
  backgroundColor: '#000000',
  opacity: 1,
  backgroundImage:  'linear-gradient(30deg, #101010 12%, transparent 12.5%, transparent 87%, #101010 87.5%, #101010), linear-gradient(150deg, #101010 12%, transparent 12.5%, transparent 87%, #101010 87.5%, #101010), linear-gradient(30deg, #101010 12%, transparent 12.5%, transparent 87%, #101010 87.5%, #101010), linear-gradient(150deg, #101010 12%, transparent 12.5%, transparent 87%, #101010 87.5%, #101010), linear-gradient(60deg, #10101077 25%, transparent 25.5%, transparent 75%, #10101077 75%, #10101077), linear-gradient(60deg, #10101077 25%, transparent 25.5%, transparent 75%, #10101077 75%, #10101077)',
  backgroundSize: '80px 140px',
  backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px'
}