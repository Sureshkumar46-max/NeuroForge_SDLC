import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle2, AlertCircle } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import Button from "../components/Button";
import { useWorkspace } from "../context/WorkspaceContext";
import axios from "axios";

function AcceptInvite() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const { acceptInvite } = useWorkspace();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [checking, setChecking] = useState(true);
  const [valid, setValid] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!token) {
      setValid(false);
      setChecking(false);
      return;
    }
    axios
      .get(`http://localhost:8080/api/invites/verify?token=${token}`)
      .then((res) => setValid(res.data.valid))
      .catch(() => setValid(false))
      .finally(() => setChecking(false));
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !password) {
      setStatus({ type: "error", message: "Please enter name and password." });
      return;
    }

    const result = await acceptInvite({ token, name, password });
    if (!result) {
      setStatus({ type: "error", message: "Invite not found or already accepted." });
      return;
    }

    setStatus({ type: "success", message: "Account created! Redirecting..." });
    setTimeout(() => navigate("/"), 1400);
  };

  if (checking) {
    return (
      <AuthLayout>
        <p>Checking invite...</p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <h2>Accept invitation</h2>
      <p className="auth-sub">Accept your invite and join the organization workspace.</p>

      {status && (
        <p className={status.type === "error" ? "error-text" : "success-text"}>
          {status.type === "error" ? <AlertCircle size={15} /> : <CheckCircle2 size={15} />} {status.message}
        </p>
      )}

      {valid ? (
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="full-width">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            <div className="full-width">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Set a password"
              />
            </div>
          </div>

          <Button type="submit">Accept invite</Button>
        </form>
      ) : (
        <div className="auth-card">
          <p>Invite not found, expired, or already accepted.</p>
          <Button variant="secondary" onClick={() => navigate("/")}>Return to login</Button>
        </div>
      )}
    </AuthLayout>
  );
}

export default AcceptInvite;