import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { I18nProvider } from "./i18n-client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme } from "./theme"; // Ensure the correct import
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <I18nProvider>
            {children}
            <Toaster />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
