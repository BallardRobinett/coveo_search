import { useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid,
  ThemeProvider,
  createTheme,
  CssBaseline,
  alpha
} from '@mui/material';
import SearchBox from "./components/SearchBox";
import Facet from "./components/Facet";
import ResultList from "./components/ResultList";
import Pager from "./components/Pager";
import { pager as PagerController } from "./controllers/controllers";
import { resultTemplatesManager } from './controllers/ResultTemplatesManager';

import {
  searchBox as SearchBoxController,
  facet as FacetController,
  resultList as ResultListController,
  sort as SortController,
} from './controllers/controllers';
import { criteria, Sort } from './components/Sort';
import { headlessEngine } from "./Engine";

// Sophisticated dark color palette
const colors = {
  background: '#1A1C23', // Deep blue-grey
  paper: '#252832', // Slightly lighter blue-grey
  primary: '#546E7A', // Muted blue-grey
  secondary: '#455A64', // Darker blue-grey
  accent: '#78909C', // Light blue-grey
  text: {
    primary: '#E0E3E7',
    secondary: '#B0BEC5',
    muted: '#90A4AE'
  },
  border: '#2F3543'
};

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: colors.background,
      paper: colors.paper,
    },
    primary: {
      main: colors.primary,
      dark: colors.secondary,
      light: colors.accent,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: colors.text.primary,
      letterSpacing: '-0.02em',
    },
    h6: {
      fontWeight: 600,
      color: colors.text.primary,
    },
    body1: {
      color: colors.text.secondary,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: colors.paper,
          borderRadius: 8,
          border: `1px solid ${colors.border}`,
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: '6px',
          padding: '8px 16px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(colors.paper, 0.6),
          '&:hover': {
            backgroundColor: alpha(colors.paper, 0.8),
          },
          '&.Mui-focused': {
            backgroundColor: colors.paper,
          },
        },
        notchedOutline: {
          borderColor: colors.border,
        },
      },
    },
  },
});

let didInit = false;

function App() {
  useEffect(() => {
    if (!didInit) {
      didInit = true;
      headlessEngine.executeFirstSearch();
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        sx={{ 
          minHeight: '100vh',
          background: colors.background,
          pt: 4,
          pb: 6
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h1" 
            component="h1" 
            align="center" 
            sx={{ mb: 5 }}
          >
            Ballard's Headless Search
          </Typography>
          
          <Box 
            sx={{ 
              mb: 4,
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            <SearchBox controller={SearchBoxController} />
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 3,
                  backgroundColor: colors.paper,
                }}
              >
                <Facet controller={FacetController} title="Source" />
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={9}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 3,
                  backgroundColor: colors.paper,
                }}
              >
                <Box sx={{ mb: 3 }}>
                  <Sort controller={SortController} criteria={criteria} />
                </Box>
                <ResultList
                  controller={ResultListController}
                  resultTemplatesManager={resultTemplatesManager}
                />
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                  <Pager controller={PagerController} />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;