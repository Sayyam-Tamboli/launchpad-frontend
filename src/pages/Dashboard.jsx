import { useEffect, useState } from "react";
import TileCard from "../components/TileCard";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function Dashboard({ activePage, onLogout }) {
  const [tiles, setTiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (activePage === "DASHBOARD") {
      fetchTiles();
    }
  }, [activePage]);

  const fetchTiles = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE}/tiles`, {
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

      setTiles(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ flex: 1, color: "#e2e8f0" }}>
      <header className="header">
        <strong>Welcome Back 👋</strong>

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
      </header>

      <main style={{ padding: 40 }}>
        {activePage === "DASHBOARD" && (
          <>
            {loading && <p>Loading applications…</p>}

            {error && (
              <p style={{ color: "#ef4444" }}>{error}</p>
            )}

            {!loading && !error && (
              <div className="tile-grid">
                {tiles.map((tile) => (
                  <TileCard key={tile.id} tile={tile} />
                ))}
              </div>
            )}
          </>
        )}

        {activePage === "SETTINGS" && (
          <div style={{ textAlign: "center", marginTop: 120 }}>
            <h2>⚙️ Settings</h2>
            <p style={{ color: "#94a3b8" }}>Coming soon</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;