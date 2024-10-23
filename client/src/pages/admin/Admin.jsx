import { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

// import Dashboard from "./scenes/dashboard";
// import Team from "./scenes/team";
// import Invoices from "./scenes/invoices";
// import Contacts from "./scenes/contacts";
// import Bar from "./scenes/bar";
// import Form from "./scenes/form";
// import Line from "./scenes/line";
// import Pie from "./scenes/pie";
// import FAQ from "./scenes/faq";
// import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";
import Topbar from "./global/Topbar";
import Sidebar from "./global/SideBar";
import DashBoard from "./dashboard";
import Team from "./team";
// import Calendar from "./scenes/calendar";

function Admin() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <div className="app-admin">
            <Sidebar isSidebar={isSidebar} />
            <main className="content-admin">
              <Topbar setIsSidebar={setIsSidebar} />
              <Outlet></Outlet>
            </main>
          </div>
        </CssBaseline>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Admin;
