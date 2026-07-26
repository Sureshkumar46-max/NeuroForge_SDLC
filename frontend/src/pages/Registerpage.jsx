import { useState } from "react";
import axios from "axios";
import "../App.css";

const ROLES = [
  { value: "SUPER_ADMIN", label: "Super Admin", code: "SA" },
  { value: "ORG_ADMIN", label: "Org Admin", code: "OA" },
  { value: "PROJECT_MANAGER", label: "Project Manager", code: "PM" },
  { value: "DEVELOPER", label: "Developer", code: "DEV" },
  { value: "QA_TESTER", label: "QA Tester", code: "QA" },
  { value: "CLIENT", label: "Client", code: "CL" },
];

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "" });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: null }));
  }

  function passwordStrength(pw) {
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8) e.password = "At least 8 characters";
    if (!form.role) e.role = "Select a role";
    return e;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setSubmitting(true);
    try {
      await axios.post("http://localhost:8080/api/auth/register", form);
      setSubmitted(true);
    } catch (err) {
      setErrors({ form: "Registration failed. Try again." });
    } finally {
      setSubmitting(false);
    }
  }

  const strength = passwordStrength(form.password);
  const strengthLabel = ["Too short", "Weak", "Fair", "Good", "Strong"][strength];

  return (
    <div className="auth-shell">
      {/* LEFT — BRAND PANEL */}
      <div className="auth-left">
        <div>
          <div className="hero-stamp-mini">New Account · Platform Access</div>

          <div className="auth-logo">
            <div className="auth-logo-mark">N</div>
            <div className="auth-logo-text">
              <b>NeuroForge</b>
              <small>AI-FIRST ENTERPRISE SDLC PLATFORM</small>
            </div>
          </div>

          <h1 className="auth-headline">Build. Review. Ship. Together.</h1>
          <p className="auth-sub">
            Plan sprints, track code reviews, run CI/CD pipelines and manage
            your entire delivery lifecycle — in one connected workspace.
          </p>

          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-dot" />
              <div>
                <b>Agile Boards &amp; Sprints</b>
                <p>Kanban boards with live drag-and-drop sync across the team.</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-dot" />
              <div>
                <b>AI Code Review</b>
                <p>Automated pull request analysis before every merge.</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-dot" />
              <div>
                <b>CI/CD Pipeline Tracker</b>
                <p>Watch builds and deployments move through every stage.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-footnote">JWT-SECURED · ROLE-SCOPED · MULTI-TENANT</div>
      </div>

      {/* RIGHT — FORM PANEL */}
      <div className="auth-right">
        <div className="auth-card">
          {submitted ? (
            <div className="success-card">
              <div className="success-icon">✓</div>
              <h2>Account created</h2>
              <p>Check <b>{form.email}</b> to verify, then sign in.</p>
              <a
                className="btn-primary"
                href="/login"
                style={{ display: "inline-block", textDecoration: "none", marginTop: 18 }}
              >
                Go to login
              </a>
            </div>
          ) : (
            <>
              <div className="auth-eyebrow">Register</div>
              <h2 className="auth-title">Create your account</h2>

              <form onSubmit={handleSubmit} noValidate>
                <div className={`field ${errors.name ? "error" : ""}`}>
                  <label>Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="e.g. your name"
                  />
                  {errors.name && <p className="field-error">{errors.name}</p>}
                </div>

                <div className={`field ${errors.email ? "error" : ""}`}>
                  <label>Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@company.com"
                  />
                  {errors.email && <p className="field-error">{errors.email}</p>}
                </div>

                <div className={`field ${errors.password ? "error" : ""}`}>
                  <label>Password</label>
                  <div className="pw-wrap">
                    <input
                      type={showPw ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => update("password", e.target.value)}
                      placeholder="At least 8 characters"
                    />
                    <button type="button" className="pw-toggle" onClick={() => setShowPw((s) => !s)}>
                      {showPw ? "Hide" : "Show"}
                    </button>
                  </div>
                  {form.password && (
                    <div className="strength-row">
                      <div className="strength-bar">
                        <span style={{ width: `${(strength / 4) * 100}%` }} className={`s${strength}`} />
                      </div>
                      <span className="strength-label">{strengthLabel}</span>
                    </div>
                  )}
                  {errors.password && <p className="field-error">{errors.password}</p>}
                </div>

                <div className={`field ${errors.role ? "error" : ""}`}>
                  <label>Select role</label>
                  <div className="role-grid">
                    {ROLES.map((r) => (
                      <button
                        type="button"
                        key={r.value}
                        className={`role-pick ${form.role === r.value ? "active" : ""}`}
                        onClick={() => update("role", r.value)}
                      >
                        <span className="role-pick-code">{r.code}</span>
                        <span className="role-pick-label">{r.label}</span>
                      </button>
                    ))}
                  </div>
                  {errors.role && <p className="field-error">{errors.role}</p>}
                </div>

                <button type="submit" className="btn-primary" disabled={submitting}>
                  {submitting ? "Creating account…" : "Create account"}
                </button>
              </form>

              <p className="auth-switch">
                Already have one? <a href="/login">Sign in</a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}