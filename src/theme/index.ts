import { createTheme } from "@material-ui/core/styles";
import { createGlobalStyle } from "styled-components";
import { HEXColor } from "./types";

const theme = createTheme({
  palette: {
    primary: {
      main: HEXColor.Primary,
    },
    secondary: {
      light: HEXColor.SecondaryLight,
      main: HEXColor.Secondary,
      contrastText: HEXColor.Primary,
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: `"Open Sans", "Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
  },
});

const GlobalStyle = createGlobalStyle`
:root {
  --primary: ${HEXColor.Primary};
  --primary-light: ${HEXColor.PrimaryLight};
  --secondary: ${HEXColor.Secondary};
  --secondary-light: ${HEXColor.SecondaryLight};
  --paper: ${HEXColor.Paper};
  --error: ${HEXColor.Error};
  --error-light: ${HEXColor.ErrorLight};
  --success: ${HEXColor.Success};
  --success-light: ${HEXColor.SuccessLight};
  --text: ${HEXColor.Text};
  --text-light: ${HEXColor.TextLight};
  --secondary-hover:${HEXColor.SecondaryHover};
  --background: ${HEXColor.Background};
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background: var(--background);
  -webkit-font-smoothing: antialiased;
}
body, input, textarea, button, select {
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
}
h1, h2, h3, h4, h5, h6, strong {
  font-weight: 600;
}
span.error {
  color: ${HEXColor.Error};
}
html {
  @media (max-width: 1080px) {
    font-size: 93%;
  }
  @media (max-width: 720px) {
    font-size: 87%;
  }
}
button {
  cursor: pointer;
}
[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
`;

export { theme, GlobalStyle };
