import { useEffect, useState } from "react";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

function Dashboard({
  darkMode,
  toggleTheme,
  onLogout,
  sidebarHidden,
  toggleSidebar,
  activePage,
  setActivePage,
}) {
  const [tiles, setTiles] = useState([]);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    loadTiles();

    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const loadTiles = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/tiles`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTiles(data.data || []);
    } catch (err) {
      console.error("Tiles load failed");
    }
  };

  const onlineCount = tiles.filter(t => t.status === "ONLINE").length;
  const offlineCount = tiles.length - onlineCount;

  return (
    <div className={`layout ${sidebarHidden ? "sidebar-hidden" : ""}`}>

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo">🚀 Nexus AI</div>

        <div className="menu">
          <div
            className={`menu-item ${activePage === "DASHBOARD" ? "active" : ""}`}
            onClick={() => setActivePage("DASHBOARD")}
          >
            Dashboard
          </div>

          <div
            className={`menu-item ${activePage === "SETTINGS" ? "active" : ""}`}
            onClick={() => setActivePage("SETTINGS")}
          >
            Settings
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div className="main">

        <header className="header">
          <button className="burger" onClick={toggleSidebar}>☰</button>

          <div className="header-right">
            <button className="theme-btn" onClick={toggleTheme}>
              {darkMode ? "🌙" : "☀️"}
            </button>

            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </div>
        </header>

        {activePage === "DASHBOARD" && (
          <>
            <div className="widgets">
              <div className="widget">
                <h2>Good Morning, Admin</h2>
                <p>All systems operational.</p>
              </div>

              <div className="widget">
                <h3>Local Time</h3>
                <p>{time.toLocaleTimeString()}</p>
              </div>

              <div className="widget">
                <h3>Status</h3>
                <p>Total: {tiles.length}</p>
                <p>Online: {onlineCount}</p>
                <p>Offline: {offlineCount}</p>
              </div>
            </div>

            <div className="grid">
              {tiles.map(tile => (
                <div
                  key={tile.id}
                  className={`tile ${tile.status === "ONLINE" ? "online" : "offline"}`}
                  onClick={() =>
                    tile.status === "ONLINE" && window.open(tile.link, "_blank")
                  }
                >
                  <div className="tile-icon">{tile.icon}</div>
                  <h3>{tile.name}</h3>
                  <p>{tile.description}</p>
                  <span className="status-badge">
                    {tile.status}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {activePage === "SETTINGS" && (
          <div className="settings-page">
            <h2>Settings</h2>
            <p>Theme mode: {darkMode ? "Dark" : "Light"}</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;