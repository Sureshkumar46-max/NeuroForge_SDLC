import Logo from "./Logo";

function AuthLayout({ children }) {
  return (
    <div className="auth-shell">
      <div className="auth-brand">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>

        <div className="auth-brand-top">
          <Logo />
          <h1>
            One platform to run the <span>entire SDLC</span> — from spec to release.
          </h1>
          <p>
            AI-assisted planning, role-based workflows, and real-time collaboration
            for every team in your organization.
          </p>
        </div>

        <div className="auth-brand-stats">
          <div>
            <b>15</b>
            <small>Modules</small>
          </div>
          <div>
            <b>6</b>
            <small>Roles</small>
          </div>
          <div>
            <b>100%</b>
            <small>Role-gated</small>
          </div>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-card">
          <div className="mobile-logo">
            <Logo />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
