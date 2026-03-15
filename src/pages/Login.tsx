import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Submit from "../components/Submit";
import InputField from "../components/InputField";
import Link from "../components/Link";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here (e.g., API call)
    console.log("Login attempt:", { username, password });
    // For demo purposes, navigate to dashboard on any login
    navigate("/dashboard");
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
