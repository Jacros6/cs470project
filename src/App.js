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

const customTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#072d42"
    }
  },

  components: {
    MuiButton: {
      styleOverrides: {
        text: {
          color: "#ffffff"
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

function App() {
  return (
      <Router>
        <ThemeProvider theme={customTheme}>
          <CssBaseline />
            <TopBar />
            <Switch>
              <Route exact path="/">
                <MainPage />
              </Route>
              <Route exact path="/games">
                <GamesPage />
              </Route>
              <Route exact path="/lists">
                <MainPage />
              </Route>
              <Route exact path="/games/:gameID">
                <GameSummary />
              </Route>
              <Route exact path="/login">
                <LoginPage />
              </Route>
              <Route exact path="/create-account">
                <CreateAccountPage />
              </Route>
            </Switch>
        </ThemeProvider>
      </Router>
  );
}

export default App;
