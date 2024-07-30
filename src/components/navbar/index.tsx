"use client";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { LanguageSwitchButton } from "./languageSwitchDropdown";
import { useTranslation } from "react-i18next";
import { useUserStore } from "@/store/UserStore";
import { getThemedStyles } from "./styles";

export const Navbar: React.FC = () => {
  const router = useRouter(); // Move useRouter here
  const { t } = useTranslation();
  const { user, assignRole } = useUserStore();
  const styles = getThemedStyles();

  const handleLogout = async () => {
    await assignRole("");
    router.push("/"); // Now you can use the router within handleLogout
  };

  return (
    <AppBar sx={user.role.length === 0 ? styles.appbarLogin : null}>
      <Toolbar>
        <Box className="flex grow gap-[10px]">
          {user.role.length > 0 && (
            <>
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
            </>
          )}
        </Box>
        <LanguageSwitchButton />
        {user.role.length > 0 && (
          <Button
            variant="outlined"
            onClick={handleLogout}
            color="inherit"
            sx={{ ml: "10px", height: "40px", width: "120px" }}
          >
            {t("logout")}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
