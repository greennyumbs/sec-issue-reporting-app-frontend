"use client";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { LanguageSwitchButton } from "./languageSwitchDropdown";
import { useTranslation } from "react-i18next";

export const Navbar: React.FC = () => {
  const router = useRouter(); // Move useRouter here
  const { t } = useTranslation();

  const handleLogout = async () => {
    // Implement your logout logic (clear cookies, local storage, etc.)
    router.push("/"); // Now you can use the router within handleLogout
  };

  return (
    <AppBar>
      <Toolbar>
        <Box className="flex grow gap-[10px]">
          <Button
            className="w-[130px]"
            color="inherit"
            component={Link}
            href="/activeIssues"
          >
            {t("active_issues")}
          </Button>
          <Button
            className="w-[130px]"
            color="inherit"
            component={Link}
            href="/historyLog"
          >
            {t("history_logs")}
          </Button>
        </Box>
        <LanguageSwitchButton />
        <Button
          variant="outlined"
          onClick={handleLogout}
          color="inherit"
          sx={{ ml: "10px", height: "40px", width: "120px" }}
        >
          {t("logout")}
        </Button>
      </Toolbar>
    </AppBar>
  );
};
