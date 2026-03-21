import { useState } from "react";
import InputField from "../components/InputField";
import Submit from "../components/Submit";
import Link from "../components/Link";

const ForgotPassword = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(
      "If an account exists, password reset details will be sent to your email or phone number.",
    );
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
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  required
                  helpText="Enter your registered email ID or phone number."
                />
                <Submit text="Send Password" />
              </form>
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
