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
      onMouseEnter={(e) => {
        if (isOnline) e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
      style={{
        padding: 24,
        borderRadius: 16,
        background: theme.colors.surface,
        boxShadow: theme.colors.cardShadow,
        cursor: isOnline ? "pointer" : "default",
        opacity: isOnline ? 1 : 0.55,
        transition: "transform 0.2s ease",
      }}
    >
      <div style={{ fontSize: 28 }}>{tile.icon}</div>

      <h3 style={{ marginTop: 12 }}>{tile.name}</h3>

      <p style={{ color: theme.colors.textSecondary }}>
        {tile.description}
      </p>

      <span
        style={{
          marginTop: 12,
          display: "inline-block",
          padding: "4px 12px",
          borderRadius: 999,
          fontSize: 12,
          fontWeight: 600,
          background: isOnline ? "#dcfce7" : "#fee2e2",
          color: isOnline ? "#166534" : "#991b1b",
        }}
      >
        {isOnline ? "Online" : "Offline"}
      </span>
    </div>
  );
}

export default TileCard;