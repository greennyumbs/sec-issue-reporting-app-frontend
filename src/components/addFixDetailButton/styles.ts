import { type SxProps, type Theme } from "@mui/material";

type StylesKeys = "fixDetailBox" | "fixDetailBoxHistory";

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({
  fixDetailBox: { display: "flex", justifyContent: "center" },
  fixDetailBoxHistory: { display: "flex", justifyContent: "space-between" },
});
