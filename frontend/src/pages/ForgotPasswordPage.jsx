import { useState } from "react";
import axios from "axios";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1); // 1 = email, 2 = otp + new password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSendOtp(ev) {
    ev.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post("http://localhost:8080/api/auth/forgot-password", { email });
      setStep(2);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleResetPassword(ev) {
    ev.preventDefault();
    setError("");

    if (!otp.trim()) {
      setError("OTP is required");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post("http://localhost:8080/api/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-left">
        <div>
          <div className="auth-logo">
            <div className="auth-logo-mark">N</div>
            <div className="auth-logo-text">
              <b>NeuroForge</b>
              <small>AI-FIRST ENTERPRISE SDLC PLATFORM</small>
            </div>
          </div>
          <h1 className="auth-headline">Reset your workspace password.</h1>
          <p className="auth-sub">
            Enter your registered email to receive a one-time password (OTP), then set a new password.
          </p>
        </div>
        <div className="auth-footnote">SECURE LOG-IN · ENTERPRISE GRADE SDLC CONTROL</div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <div className="auth-eyebrow">Account Recovery</div>
          <h2 className="auth-title" style={{ marginBottom: "24px" }}>
            {success ? "Password reset" : step === 1 ? "Forgot password" : "Enter OTP"}
          </h2>

          {success ? (
            <div>
              <p className="auth-sub">
                Your password has been reset successfully.
              </p>
              <p className="auth-switch" style={{ marginTop: "20px" }}>
                <a href="/login">Back to sign in</a>
              </p>
            </div>
          ) : step === 1 ? (
            <form onSubmit={handleSendOtp} noValidate>
              <div className={`field ${error ? "error" : ""}`}>
                <label>Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="name@enterprise.com"
                />
                {error && <p className="field-error">{error}</p>}
              </div>

              <button type="submit" className="btn-primary" disabled={submitting}>
                {submitting ? "Sending…" : "Send OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} noValidate>
              <p className="auth-sub" style={{ marginBottom: "16px" }}>
                OTP sent to <b>{email}</b>
              </p>

              <div className="field">
                <label>OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                    setError("");
                  }}
                  placeholder="6-digit code"
                  maxLength={6}
                />
              </div>

              <div className="field">
                <label>New password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="••••••••"
                />
              </div>

              <div className="field">
                <label>Confirm new password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="••••••••"
                />
              </div>

              {error && <p className="field-error">{error}</p>}

              <button type="submit" className="btn-primary" disabled={submitting}>
                {submitting ? "Resetting…" : "Reset password"}
              </button>

              <p className="auth-switch" style={{ marginTop: "12px" }}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setStep(1);
                    setOtp("");
                    setError("");
                  }}
                >
                  Change email
                </a>
              </p>
            </form>
          )}

          <p className="auth-switch" style={{ marginTop: "20px" }}>
            Remembered your password? <a href="/login">Back to sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
}