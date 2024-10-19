import './App.css'
import { MainContent } from './components/MainContent';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';


function App() {

  return (
    <ThemeProvider theme={theme}>
      <MainContent />
    </ThemeProvider>
  );
}

export default App
