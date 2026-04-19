import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Submit from "../../components/Submit";
import InputField from "../../components/InputField";
import Link from "../../components/Link";
import { userApi } from "../../utils/apiService";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await userApi.login({ username, password });
      navigate("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Invalid username or password");
      } else {
        setError("Unable to reach server. Please try again.");
      }
    }
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card border-0 custom-shadow">
            <div className="card-body p-5">
              <h5 className="fw-bold text-primary mb-4">Smart Ledger</h5>
              <h4 className="fw-bold mb-2 text-start">
                Log in to your account
              </h4>
              <p className="text-muted mb-4 text-start">
                Please enter your details
              </p>
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
                <Link
                  text="Forgot Password?"
                  to="/forgot-password"
                  className="me-3"
                />
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
