import { type SxProps, type Theme } from "@mui/material";

type StylesKeys = "appbarLogin";

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({
  appbarLogin: { backgroundColor: "transparent", boxShadow: "none" },
});
