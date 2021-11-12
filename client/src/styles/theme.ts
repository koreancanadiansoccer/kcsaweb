import { createTheme, Theme, ThemeOptions } from '@material-ui/core/styles';

export const primary = '#274555';

// Base theme.
const theme = {
  palette: {
    background: {
      default: '#F1F4F6',
    },
    primary: {
      main: primary,
    },
    secondary: {
      main: '#F17F42',
    },
    text: {
      primary: primary,
    },
  },
  // May need this later.
  // breakpoints: {
  //   values: {
  //     xs: 0,
  //     sm: 600,
  //     md: 900,
  //     lg: 1600,
  //     xl: 1536,
  //   },
  // },
  /** Global CSS */
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          scrollBehavior: 'smooth',
          margin: 0,
          backgroundColor: 'white',
        },
        '.boldText': {
          fontWeight: '700 !important',
        },
      },
    },
    MuiTabs: {
      root: {
        backgroundColor: 'white',
      },
      indicator: {
        height: '0.25rem',
      },
    },
    MuiPaper: {
      elevation3: {
        borderRadius: '8px',
      },
    },
    MuiGrid: {
      root: {
        flexGrow: 1,
      },
    },
    MuiButton: {
      root: {
        fontSize: '0.8rem',
      },
      containedSecondary: {
        color: 'white',
      },
    },
    MuiIconButton: {
      root: {
        '&:hover': {
          color: 'red',
        },
      },
    },
    MuiDialogContent: {
      root: {
        padding: '0 1rem 1rem 1rem',
      },
    },
    MuiDialogTitle: {
      root: {
        padding: '0.5rem 1rem 0.5rem 1rem',
      },
    },
    MuiAccordionDetails: {
      root: {
        display: 'block',
      },
    },
  },
} as ThemeOptions;

/**
 * Creates a theme.
 */
export const createAppTheme = (): Theme => {
  return createTheme(theme);
};
