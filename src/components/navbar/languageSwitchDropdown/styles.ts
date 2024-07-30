import { type SxProps, type Theme } from "@mui/material";

type StylesKeys = "languageSwitchDropdownLogin" | "languageSwitchDropdown";

export const getThemedStyles = (): {
  [key in StylesKeys]: SxProps<Theme> | any;
} => ({
  languageSwitchDropdownLogin: {
    color: "black",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "inherit",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "inherit",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
    },
    "& .MuiSelect-icon": { color: "inherit" },
  },
  languageSwitchDropdown: {
    color: "inherit",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "inherit",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "inherit",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "inherit",
    },
    "& .MuiSelect-icon": { color: "inherit" },
  },
});
