import { useState } from "react";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

function Login({ onLoginSuccess, darkMode, toggleTheme }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (data.token) onLoginSuccess(data.token);
  };

  return (
    <div className={`login-page ${darkMode ? "dark" : "light"}`}>

      <button className="login-toggle" onClick={toggleTheme}>
        {darkMode ? "🌙" : "☀️"}
      </button>

      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Nexus AI Control Center</h2>

        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;