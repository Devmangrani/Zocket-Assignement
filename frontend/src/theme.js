import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#4A90E2',
      light: '#A4C8E1',
      dark: '#003D66',
    },
    secondary: {
      main: '#F39C12',
      light: '#F6B93B',
      dark: '#C67A00',
    },
    background: {
      default: '#F4F6F8',
      paper: '#FFFFFF',
    },
    success: {
      main: '#10B981',
      lighter: '#ECFDF5'
    },
    warning: {
      main: '#F59E0B',
      lighter: '#FEF3C7'
    },
    info: {
      main: '#3B82F6',
      lighter: '#EFF6FF'
    },
    error: {
      main: '#EF4444',
      lighter: '#FEE2E2'
    },
    custom: {
      gradients: {
        primary: 'linear-gradient(45deg, #2563eb 30%, #60a5fa 90%)',
        hover: 'linear-gradient(45deg, #1e40af 30%, #3b82f6 90%)',
        success: 'linear-gradient(45deg, #059669 30%, #10b981 90%)',
        warning: 'linear-gradient(45deg, #d97706 30%, #f59e0b 90%)'
      }
    }
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #2563eb 30%, #60a5fa 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #1e40af 30%, #3b82f6 90%)',
          }
        }
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          }
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
          }
        }
      }
    }
  },
});
