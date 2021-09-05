import { createTheme, Theme, ThemeOptions } from "@material-ui/core/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";

// Base theme.
const theme = {
  palette: {
    background: {
      default: "#F1F4F6",
    },
    primary: {
      main: "#203946",
    },
  },
  typography: {
    subtitle2: { color: blueGrey[300] },
  },
  /** Global CSS */
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          scrollBehavior: "smooth",
          margin: 0,
        },
      },
    },
    MuiFormControl: {
      root: {
        minWidth: "120px",
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
