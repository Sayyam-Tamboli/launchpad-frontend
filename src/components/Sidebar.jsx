function Sidebar({ theme, activePage, onNavigate }) {
  return (
    <aside
      style={{
        width: 240,
        padding: 24,
        background: theme.colors.sidebar,
        borderRight: `1px solid ${theme.colors.border}`,
      }}
    >
      <h2 style={{ marginBottom: 32, color: theme.colors.textPrimary }}>
        🚀 Launch Pad
      </h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Item
          label="Dashboard"
          active={activePage === "DASHBOARD"}
          onClick={() => onNavigate("DASHBOARD")}
          theme={theme}
        />
        <Item
          label="Settings"
          active={activePage === "SETTINGS"}
          onClick={() => onNavigate("SETTINGS")}
          theme={theme}
        />
      </nav>
    </aside>
  );
}

function Item({ label, active, onClick, theme }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "10px 14px",
        borderRadius: 10,
        cursor: "pointer",
        fontWeight: 500,
        background: active ? theme.colors.primary : "transparent",
        color: active ? "#fff" : theme.colors.textPrimary,
      }}
    >
      {label}
    </div>
  );
}

export default Sidebar;