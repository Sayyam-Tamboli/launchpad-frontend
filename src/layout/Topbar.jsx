function Topbar({ onToggleTheme, darkMode, onLogout, onMenuClick }) {
  return (
    <div className="topbar">
      <div
        style={{ cursor: "pointer", fontSize: 20 }}
        onClick={onMenuClick}
      >
        ☰
      </div>

      <div style={{ display: "flex", gap: 16 }}>
        <button onClick={onToggleTheme}>
          {darkMode ? "☀️" : "🌙"}
        </button>

        <button
          onClick={onLogout}
          style={{ color: "#ef4444", border: "none", background: "none" }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Topbar;