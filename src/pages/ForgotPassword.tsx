import { useState } from "react";
import InputField from "../components/InputField";
import Submit from "../components/Submit";
import Link from "../components/Link";

const ForgotPassword = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    // Phone validation: 10 digits, numeric, not starting with 0
    const phoneRegex = /^[1-9][0-9]{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!phoneRegex.test(emailOrPhone) && !emailRegex.test(emailOrPhone)) {
      setErrorMessage("Please enter a valid email address or phone number.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/users/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ emailOrPhone }),
        },
      );

      const responseText = await response.text();

      if (response.ok) {
        setSuccessMessage(
          responseText ||
            "If an account exists, password reset details will be sent.",
        );
      } else {
        setErrorMessage(responseText || "Unable to process request.");
      }
    } catch {
      setErrorMessage("Unable to reach server. Please try again.");
    }
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-3">Forgot Password</h2>
              <form onSubmit={handleSubmit}>
                <InputField
                  label="Email ID or Phone Number"
                  type="text"
                  id="emailOrPhone"
                  value={emailOrPhone}
                  onChange={(e) => {
                    setEmailOrPhone(e.target.value);
                    setSuccessMessage(null);
                    setErrorMessage(null);
                  }}
                  required
                  helpText="Enter your registered email ID or phone number."
                />
                <Submit text="Send Password" />
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
                <Link text="Back to Login" to="/" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
