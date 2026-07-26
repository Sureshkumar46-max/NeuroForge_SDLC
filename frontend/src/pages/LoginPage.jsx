import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: null }));
  }

  function validate() {
    const e = {};
    if (!form.email.trim()) e.email = "Email is required";
    if (!form.password) e.password = "Password is required";
    return e;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setSubmitting(true);
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", form);
      const token = res.data;

      const decoded = jwtDecode(token);
      const userData = {
        name: decoded.name || decoded.sub,
        email: decoded.sub,
        role: decoded.role,
        orgId: decoded.orgId,
      };

      login(userData, token);
      window.location.href = "/OrganizationDashboard";
    } catch (err) {
      setErrors({ form: "Invalid email or password" });
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

          <h1 className="auth-headline">
            Streamline your entire software development lifecycle.
          </h1>
          <p className="auth-sub">
            From requirements gathering and sprint planning to automated deployments and quality assurance. Manage your engineering velocity and product health in one integrated workspace.
          </p>

          <div className="auth-features">
            <div className="auth-feature-card">
              <h5>Agile Sprint Management</h5>
              <p>Plan backlogs, track epics, and optimize team velocity with smart developer boards.</p>
            </div>
            <div className="auth-feature-card">
              <h5>CI/CD Pipeline Tracking</h5>
              <p>Monitor your build status, code quality checks, and deployment stages in real time.</p>
            </div>
          </div>
        </div>

        <div className="auth-footnote">SECURE LOG-IN · ENTERPRISE GRADE SDLC CONTROL</div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <div className="auth-eyebrow">Workspace Login</div>
          <h2 className="auth-title" style={{ marginBottom: "24px" }}>Sign in to workspace</h2>

          <form onSubmit={handleSubmit} noValidate>
            <div className={`field ${errors.email ? "error" : ""}`}>
              <label>Email address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="name@enterprise.com"
              />
              {errors.email && <p className="field-error">{errors.email}</p>}
            </div>

            <div className={`field ${errors.password ? "error" : ""}`}>
              <label>Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                placeholder="••••••••"
              />
              {errors.password && <p className="field-error">{errors.password}</p>}
            </div>

            {errors.form && <p className="field-error">{errors.form}</p>}

            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? "Signing in…" : "Enter Workspace"}
            </button>
          </form>

          <p className="auth-switch" style={{ marginTop: "20px" }}>
            Don't have an account? <a href="/register">Create one</a>
          </p>

          <p className="auth-switch" style={{ marginTop: "8px" }}>
            <a href="/forgot-password">Forgot password?</a>
          </p>
        </div>
      </div>
    </div>
  );
}