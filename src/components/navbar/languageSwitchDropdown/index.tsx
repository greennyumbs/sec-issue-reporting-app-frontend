"use client"; // Ensure this is a client-side module

import React from "react";
import { useTranslation } from "react-i18next";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

export const LanguageSwitchButton: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || "en";

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <FormControl sx={{ m: 1, width: 100 }}>
      <Select
        value={currentLanguage}
        onChange={(e) => changeLanguage(e.target.value as string)}
        size="small"
        variant="outlined"
        sx={{
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
        }}
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="th">ไทย</MenuItem>
      </Select>
    </FormControl>
  );
};
