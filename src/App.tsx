import { ThemeProvider } from "@material-ui/core";
import SnackbarWrapper from "./components/SnackbarWapper";
import { FinancesProvider } from "./hooks/useFinances";
import Dashboard from "./pages/Dashboard";
import { theme, GlobalStyle } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarWrapper>
        <FinancesProvider>
          <Dashboard />
          <GlobalStyle />
        </FinancesProvider>
      </SnackbarWrapper>
    </ThemeProvider>
  );
}

export default App;
