"use client";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { useEffect } from "react";
import { useTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
