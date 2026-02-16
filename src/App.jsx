import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("DASHBOARD");
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const handleLoginSuccess = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setActivePage("DASHBOARD");
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="app-background">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
      />

      <Dashboard
        activePage={activePage}
        onLogout={handleLogout}
      />
    </div>
  );
}

export default App;