import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Dashboard from "./scenes/dashboard"

const  App = () => {

  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box className="app" display="flex" flexDirection="row" height="100vh" width="100vw">
          <Sidebar isSidebar={isSidebar} />
          <Box display="flex" flexDirection="column"  flexGrow="1">
            <Topbar setIsSidebar={setIsSidebar}/>
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </Box>
          
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
