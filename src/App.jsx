import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { lightTheme, darkTheme } from "./theme";

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [activePage, setActivePage] = useState("DASHBOARD");

  // 🔐 auth state
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const theme = darkMode ? darkTheme : lightTheme;

  const handleLoginSuccess = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setActivePage("DASHBOARD");
  };

  // 🔁 LOGIN PAGE
if (!isAuthenticated) {
  return (
    <Login
      onLoginSuccess={handleLoginSuccess}
      darkMode={darkMode}
      onToggleTheme={() => setDarkMode((v) => !v)}
    />
  );
}

  // 🧭 MAIN APP
  return (
    <div
      className="app-background"
      style={{
        display: "flex",
        height: "100vh",
        color: theme.colors.textPrimary,
      }}
    >
      <Sidebar
        theme={theme}
        activePage={activePage}
        onNavigate={setActivePage}
      />

      <Dashboard
        theme={theme}
        activePage={activePage}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode((v) => !v)}
        onLogout={handleLogout}
      />
    </div>
  );
}

export default App;