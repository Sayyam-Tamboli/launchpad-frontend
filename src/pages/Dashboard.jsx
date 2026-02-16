import { useEffect, useState } from "react";
import TileCard from "../components/TileCard";
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
if (!import.meta.env.VITE_API_BASE_URL) {
  console.warn("VITE_API_BASE_URL not set — using fallback:", API_BASE);
}

function Dashboard({
  theme,
  activePage,
  darkMode,
  onToggleTheme,
  onLogout,
}) {
  const [tiles, setTiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (activePage === "DASHBOARD") {
      fetchTiles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage]);

  const fetchTiles = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE}/tiles`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to load tiles");
      }

      const response = await res.json();

      if (!response.success) {
        throw new Error("Tiles API returned failure");
      }

      const mappedTiles = response.data.map((tile) => ({
        id: tile.id,
        name: tile.name,
        description: tile.description,
        status: tile.status,
        link: tile.link,
        icon: tile.icon,
      }));

      setTiles(mappedTiles);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ flex: 1 }}>
      {/* HEADER */}
      <header
        className="header"
        style={{
          borderBottom: `1px solid ${theme.colors.border}`,
        }}
      >
        <strong style={{ fontSize: 18 }}>
          Welcome back 👋
        </strong>

        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <button
            onClick={onToggleTheme}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: 18,
            }}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <button
            onClick={onLogout}
            style={{
              background: "transparent",
              border: "none",
              color: "#ef4444",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            ⎋ Log out
          </button>
        </div>
      </header>

      {/* CONTENT */}
      <main style={{ padding: 32 }}>
        {activePage === "DASHBOARD" && (
          <>
            {loading && <p>Loading applications…</p>}

            {error && (
              <div>
                <p style={{ color: "#ef4444" }}>{error}</p>
                <button onClick={fetchTiles}>Retry</button>
              </div>
            )}

            {!loading && !error && tiles.length === 0 && (
              <p>No applications available</p>
            )}

            {!loading && !error && tiles.length > 0 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: 24,
                }}
              >
                {tiles.map((tile) => (
                  <TileCard key={tile.id} tile={tile} theme={theme} />
                ))}
              </div>
            )}
          </>
        )}

        {activePage === "SETTINGS" && (
          <div
            style={{
              height: "60vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: theme.colors.textSecondary,
            }}
          >
            <div style={{ fontSize: 48 }}>⚙️</div>
            <h2>Settings</h2>
            <p>Coming soon</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;