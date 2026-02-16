function TileCard({ tile, theme }) {
  const isOnline = tile.status === "ONLINE";

  const handleClick = () => {
    if (isOnline && tile.link) {
      window.open(tile.link, "_blank");
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`tile-card ${isOnline ? "online" : ""}`}
      style={{
        background: theme.colors.surface,
        boxShadow: theme.colors.cardShadow,
        cursor: isOnline ? "pointer" : "default",
        opacity: isOnline ? 1 : 0.55,
      }}
    >
      <div style={{ fontSize: 28 }}>{tile.icon}</div>

      <h3 style={{ marginTop: 12 }}>{tile.name}</h3>

      <p style={{ color: theme.colors.textSecondary }}>
        {tile.description}
      </p>

      <div
        className="status-badge"
        style={{
          background: isOnline ? "#dcfce7" : "#fee2e2",
          color: isOnline ? "#166534" : "#991b1b",
        }}
      >
        <div
          className="pulse-dot"
          style={{
            background: isOnline ? "#16a34a" : "#dc2626",
            animation: isOnline ? "pulse 1.5s infinite" : "none",
          }}
        />
        {isOnline ? "Online" : "Offline"}
      </div>
    </div>
  );
}

export default TileCard;