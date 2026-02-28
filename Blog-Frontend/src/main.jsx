import { StrictMode, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App.jsx";

function Root() {
  const [mode, setMode] = useState("light");

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode: mode,
      },
    }),
  [mode]);

  return (
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
  );
}

createRoot(document.getElementById("root")).render(<Root />);