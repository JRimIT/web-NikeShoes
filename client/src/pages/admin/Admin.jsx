import { useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";
import Topbar from "./global/Topbar";
import Sidebar from "./global/SideBar";
import ClipLoader from "react-spinners/ClipLoader";
import { getUserByToken } from "../../data/api/apiService";

function Admin() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchUserInfo();
    } else {
      setIsLoading(false);
    }
  }, [token]);

  const fetchUserInfo = async () => {
    try {
      const res = await getUserByToken();
      setUser(res.data); // Cập nhật `user` khi nhận dữ liệu
    } catch (error) {
      console.log(error.response ? error.response.data.message : error.message);
    } finally {
      setIsLoading(false); // Tắt loading
    }
  };

  const override = {
    display: "block",
    margin: "0 auto",
    position: "absolute",
    backgroundColor: "#f1f1f1",
  };

  return (
    <>
      {isLoading ? (
        <div className="Loading-Page">
          <ClipLoader
            cssOverride={override}
            color={"#000000"}
            loading={isLoading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline>
              <div className="app-admin">
                {user && <Sidebar userInfo={user} isSidebar={isSidebar} />}
                <main className="content-admin">
                  <Topbar setIsSidebar={setIsSidebar} />
                  <Outlet />
                </main>
              </div>
            </CssBaseline>
          </ThemeProvider>
        </ColorModeContext.Provider>
      )}
    </>
  );
}

export default Admin;
