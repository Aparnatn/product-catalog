"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Switch, Box } from "@mui/material";
import { useAtom } from "jotai";
import { darkModeAtom } from "./cart/themestore";
import QueryProvider from "./providers/QueryProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  const theme = createTheme({ palette: { mode: darkMode ? "dark" : "light" } });

  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
              <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
            </Box>
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
