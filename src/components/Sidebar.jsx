function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">
        🚀 Nexus LaunchPad
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
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
      </div>
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