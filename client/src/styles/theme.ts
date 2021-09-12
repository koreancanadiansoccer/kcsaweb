import { createTheme, Theme, ThemeOptions } from "@material-ui/core/styles";

export const primary = "#274555";

// Base theme.
const theme = {
  palette: {
    background: {
      default: "#F1F4F6",
    },
    primary: {
      main: primary,
    },
    text: {
      primary: primary,
    },
  },
  /** Global CSS */
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          scrollBehavior: "smooth",
          margin: 0,
          backgroundColor: "white",
        },
      },
    },
    MuiPaper: {
      elevation3: {
        borderRadius: "8px",
      },
    },
    MuiGrid: {
      root: {
        flexGrow: 1,
      },
    },
    MuiButton: {
      root: {
        fontSize: "0.8rem",
      },
      containedSecondary: {
        color: "white",
      },
    },
    MuiIconButton: {
      root: {
        "&:hover": {
          color: "red",
        },
      },
    },
    MuiDialogContent: {
      root: {
        padding: "0 1rem 1rem 1rem",
      },
    },
    MuiDialogTitle: {
      root: {
        padding: "0.5rem 1rem 0.5rem 1rem",
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
