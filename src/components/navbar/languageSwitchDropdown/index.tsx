"use client"; // Ensure this is a client-side module

import React from "react";
import { useTranslation } from "react-i18next";
import { Select, MenuItem, FormControl } from "@mui/material";
import { useUserStore } from "@/store/UserStore";
import { getThemedStyles } from "./styles";

export const LanguageSwitchButton: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || "en";
  const { user } = useUserStore();
  const styles = getThemedStyles();

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
        sx={
          user.role.length === 0
            ? styles.languageSwitchDropdownLogin
            : styles.languageSwitchDropdown
        }
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="th">ไทย</MenuItem>
      </Select>
    </FormControl>
  );
};
