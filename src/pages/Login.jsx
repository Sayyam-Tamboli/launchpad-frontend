import { useState } from "react";

function Login({ onLoginSuccess, darkMode, onToggleTheme }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

      if (!res.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await res.json();
      onLoginSuccess(data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: darkMode ? "#020617" : "#f8fafc",
        color: darkMode ? "#e5e7eb" : "#0f172a",
        position: "relative",
      }}
    >
      {/* 🌗 Theme toggle */}
      <button
        onClick={onToggleTheme}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontSize: 18,
        }}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      <form
        onSubmit={handleSubmit}
        style={{
          width: 360,
          padding: 32,
          borderRadius: 16,
          background: darkMode ? "#020617" : "#ffffff",
          boxShadow: darkMode
            ? "0 10px 40px rgba(0,0,0,0.8)"
            : "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginBottom: 24, textAlign: "center" }}>
          🚀 Launch Pad Login
        </h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={inputStyle(darkMode)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle(darkMode)}
        />

        {error && (
          <p style={{ color: "#f87171", marginTop: 8 }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            marginTop: 20,
            padding: 12,
            borderRadius: 8,
            border: "none",
            background: "#38bdf8",
            color: "#020617",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {loading ? "Signing in…" : "Login"}
        </button>
      </form>
    </div>
  );
}

const inputStyle = (darkMode) => ({
  width: "100%",
  padding: 12,
  marginBottom: 12,
  borderRadius: 8,
  border: "1px solid #1e293b",
  background: darkMode ? "#020617" : "#ffffff",
  color: darkMode ? "#e5e7eb" : "#0f172a",
});

export default Login;