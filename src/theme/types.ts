enum CSSColor {
  Primary = "var(--primary)",
  PrimaryLight = "var(--primary-light)",
  Secondary = "var(--secondary)",
  SecondaryLight = "var(--secondary-light)",
  Paper = "var(--paper)",
  Error = "var(--error)",
  ErrorLight = "var(--error-light)",
  Success = "var(--success)",
  SuccessLight = "var(--success-light)",
  Text = "var(--text)",
  TextLight = "var(--text-light)",
  SecondaryHover = "var(--secondary-hover)",
  Background = "var(--background)",
}

enum HEXColor {
  Primary = "#057DC1",
  PrimaryLight = "#E4F1F8",
  Secondary = "#7D7D7D",
  SecondaryLight = "#DEDEDE",
  Paper = "#F3F3F3",
  Error = "#EB5757",
  ErrorLight = "#F2D5D5",
  Success = "#64B084",
  SuccessLight = "#CEEEDB",
  Text = "#333333",
  TextLight = "#B0AEAE",
  SecondaryHover = "#F3F1F1",
  Background = "#FAFAFA",
}

export type ThemeColor = CSSColor;

export { HEXColor, CSSColor }; 

