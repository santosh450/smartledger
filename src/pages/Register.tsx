import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Submit from "../components/Submit";
import InputField from "../components/InputField";
import Link from "../components/Link";

const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    // Basic validation
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Password strength validation (industry standard)
    const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!pwdRegex.test(password)) {
      alert(
        "Password must be minimum 8 characters and include uppercase, lowercase, and a number.",
      );
      return;
    }

    // Email validation (basic check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Phone validation: 10 digits, numeric, not starting with 0
    const phoneRegex = /^[1-9][0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
      alert(
        "Phone number must be 10 digits, numeric, and cannot start with 0.",
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          password,
          email,
          phone,
        }),
      });

      const responseText = await response.text();

      if (response.ok) {
        setSuccessMessage("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        setErrorMessage(
          responseText || "Registration failed. Please try again.",
        );
      }
    } catch {
      setErrorMessage("Unable to reach server. Please try again.");
    }

    // Handle registration logic here (e.g., API call)
    console.log("Registration attempt:", {
      firstName,
      lastName,
      username,
      password,
      email,
      phone,
    });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Register</h2>
              <form onSubmit={handleSubmit}>
                <InputField
                  label="First Name"
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <InputField
                  label="Last Name"
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
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
                  minLength={8}
                  helpText="At least 8 chars, include upper/lowercase and a number."
                />
                <InputField
                  label="Re-enter Password"
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  helpText="Must match the password above."
                />
                <InputField
                  label="Email ID"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  helpText="Enter a valid email address (e.g. name@example.com)."
                />
                <InputField
                  label="Phone Number"
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  pattern="[1-9][0-9]{9}"
                  maxLength={10}
                  helpText="Enter a 10-digit number; can't start with 0."
                />
                <Submit text="Register" />
              </form>
              {errorMessage && (
                <div className="alert alert-danger mt-3" role="alert">
                  {errorMessage}
                </div>
              )}
              {successMessage && (
                <div className="alert alert-success mt-3" role="alert">
                  {successMessage}
                </div>
              )}
              <div className="text-center mt-3">
                <Link text="Already have an account? Login" to="/" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
