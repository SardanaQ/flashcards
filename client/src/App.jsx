import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container } from '@mui/material';
import HomePage from './pages/HomePage';
import QuestionPage from './pages/QuestionPage';


const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4caf50',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#66bb6a', 
      contrastText: '#ffffff',
    },
    success: {
      main: '#4caf50',
      contrastText: '#ffffff',
    },
    background: {
      default: '#121212', 
      paper: '#1e1e1e', 
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#a0a0a0',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 600 },
    h2: { fontSize: '2rem', fontWeight: 500 },
    h3: { fontSize: '1.5rem', fontWeight: 500 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%)',
          minHeight: '100vh',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.24)',
          background: 'linear-gradient(145deg, #2a2a2a 0%, #1e1e1e 100%)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        bar: {
          backgroundColor: '#4caf50',
        },
        root: {
          backgroundColor: '#2d2d2d',
        },
      },
    },
  },
});

function App() {
  const [selectedTheme, setSelectedTheme] = useState(null);

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
  };

  const handleBackToHome = () => {
    setSelectedTheme(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {selectedTheme ? (
          <QuestionPage selectedTheme={selectedTheme} onBack={handleBackToHome} />
        ) : (
          <HomePage onThemeSelect={handleThemeSelect} />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;