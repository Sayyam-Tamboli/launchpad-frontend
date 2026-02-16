function Sidebar({ theme, activePage, onNavigate }) {
  return (
    <aside
      className="sidebar"
      style={{
        background: theme.colors.sidebar,
        borderRight: `1px solid ${theme.colors.border}`,
        color: theme.colors.textPrimary,
      }}
    >
      <div className="sidebar-title">
        🚀 Nexus LaunchPad
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Item
          label="Dashboard"
          active={activePage === "DASHBOARD"}
          onClick={() => onNavigate("DASHBOARD")}
        />
        <Item
          label="Settings"
          active={activePage === "SETTINGS"}
          onClick={() => onNavigate("SETTINGS")}
        />
      </nav>
    </aside>
  );
}

function Item({ label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`sidebar-item ${active ? "active" : ""}`}
    >
      {label}
    </div>
  );
}

export default Sidebar;