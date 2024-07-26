"use client";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

export const Navbar: React.FC = () => {
  const router = useRouter(); // Move useRouter here

  const handleLogout = async () => {
    // Implement your logout logic (clear cookies, local storage, etc.)
    router.push("/"); // Now you can use the router within handleLogout
    console.log("Logout clicked");
  };

  return (
    <AppBar>
      <Toolbar>
        <Box className="flex grow gap-[10px]">
          <Button color="inherit" component={Link} href="/activeIssues">
            Work List
          </Button>
          <Button color="inherit" component={Link} href="/historyLog">
            History Log
          </Button>
        </Box>
        <Button color="inherit" variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};
