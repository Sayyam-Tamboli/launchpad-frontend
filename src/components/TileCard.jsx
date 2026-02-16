function TileCard({ tile }) {
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
        cursor: isOnline ? "pointer" : "default",
        opacity: isOnline ? 1 : 0.6,
      }}
    >
      <div style={{ fontSize: 28 }}>{tile.icon}</div>

      <h3 style={{ marginTop: 12 }}>{tile.name}</h3>

      <p style={{ color: "#94a3b8" }}>
        {tile.description}
      </p>

      <div
        className="status-badge"
        style={{
          background: isOnline
            ? "rgba(34,197,94,0.15)"
            : "rgba(239,68,68,0.15)",
          color: isOnline ? "#22c55e" : "#ef4444",
        }}
      >
        <div
          className="pulse-dot"
          style={{
            background: isOnline ? "#22c55e" : "#ef4444",
            animation: isOnline ? "pulse 1.5s infinite" : "none",
          }}
        />
        {isOnline ? "Online" : "Offline"}
      </div>
    </div>
  );
}

export default TileCard;