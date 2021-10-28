import logo from './logo.svg';
import './App.css';
import TopBar from "./menu/TopBar";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";

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
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
          <TopBar/>
      </ThemeProvider>
  );
}

export default App;
