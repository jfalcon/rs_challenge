import { useMemo } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import * as serviceWorker from "./serviceWorker";
import { createRoot } from "react-dom/client";
import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material';
import { App } from "./App";
import "./index.css";

function Root() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}

// render Root into the DOM
const root = createRoot(document.getElementById('root'));
root.render(<Root />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
