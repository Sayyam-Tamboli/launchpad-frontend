import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import "./index.css";

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const [sidebarHidden, setSidebarHidden] = useState(false);
  const [activePage, setActivePage] = useState("DASHBOARD");

  // Apply theme to body (important)
  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleLoginSuccess = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <Login
        darkMode={darkMode}
        toggleTheme={() => setDarkMode(v => !v)}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  return (
    <Dashboard
      darkMode={darkMode}
      toggleTheme={() => setDarkMode(v => !v)}
      onLogout={handleLogout}
      sidebarHidden={sidebarHidden}
      toggleSidebar={() => setSidebarHidden(v => !v)}
      activePage={activePage}
      setActivePage={setActivePage}
    />
  );
}

export default App;