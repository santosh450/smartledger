import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Submit from "../components/Submit";
import InputField from "../components/InputField";
import Link from "../components/Link";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const responseText = await response.text();

      if (response.ok) {
        navigate("/dashboard");
      } else {
        setError(responseText || "Invalid username or password");
      }
    } catch (err) {
      setError("Unable to reach server. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Login</h2>
              <form onSubmit={handleSubmit}>
                <InputField
                  label="Username"
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <InputField
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Submit text="Login" />
              </form>
              {error && (
                <div className="alert alert-danger mt-3" role="alert">
                  {error}
                </div>
              )}
              <div className="text-center mt-3">
                <a href="#" className="text-decoration-none me-3">
                  Forgot Password?
                </a>
                <Link text="Register" to="/register" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
