import { StrictMode, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";

import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";

import App from "./App.jsx";
const queryClient = new QueryClient()
// eslint-disable-next-line react-refresh/only-export-components
function Root() {
  const [mode, setMode] = useState("light");

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode: mode,
         primary: {
        main: "#8481E6",
       
      },
      },
     
     
       typography: {
       fontFamily: "Inter, sans-serif", // default body font

       h1: {
        fontFamily: "Space Grotesk, sans-serif",
        fontWeight: 700,
       },
       h2: {
        fontFamily: "Space Grotesk, sans-serif",
        fontWeight: 700,
       },
       h3: {
        fontFamily: "Space Grotesk, sans-serif",
        fontWeight: 600,
       },
       h4: {
        fontFamily: "Space Grotesk, sans-serif",
        fontWeight: 600,
       },
       h5: {
        fontFamily: "Space Grotesk, sans-serif",
        fontWeight: 600,
       },
       h6: {
        fontFamily: "Space Grotesk, sans-serif",
        fontWeight: 600,
       },
    },
    }),
  [mode]);

  return (
    <QueryClientProvider client={queryClient}>    
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <StrictMode>
            <Routes>
              <Route path="*" element={<App mode={mode} setMode={setMode} />} />
            </Routes>
          </StrictMode>
        </BrowserRouter>
      </ThemeProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>

  );
}

createRoot(document.getElementById("root")).render(<Root />);