import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

function decodeJwtRole(token) {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role || payload.roles || payload.authorities || null;
  } catch {
    return null;
  }
}

function normalizeRole(rawRole) {
  if (!rawRole) return null;

  if (Array.isArray(rawRole)) {
    return normalizeRole(rawRole[0]);
  }

  if (typeof rawRole === "string") {
    const roleValue = rawRole.replace(/^ROLE_/, "").toUpperCase().trim();
    const roleMap = {
      ADMIN: "Super Admin",
      SUPER_ADMIN: "Super Admin",
      SUPERADMIN: "Super Admin",
      ORGADMIN: "Org Admin",
      ORG_ADMIN: "Org Admin",
      PM: "PM",
      QA: "QA",
      DEVELOPER: "Developer",
      CLIENT: "Client",
    };
    return roleMap[roleValue] || rawRole;
  }

  if (rawRole?.authority) {
    return normalizeRole(rawRole.authority);
  }

  return null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("nf_user");
    const token = sessionStorage.getItem("nf_token");
    if (!saved) return null;

    const parsedUser = JSON.parse(saved);
    const roleFromToken = normalizeRole(decodeJwtRole(token));
    return {
      ...parsedUser,
      role: normalizeRole(parsedUser.role) || roleFromToken || "User",
    };
  });
  const [token, setToken] = useState(() => sessionStorage.getItem("nf_token"));

  const login = (userData, authToken = null) => {
    const roleFromToken = normalizeRole(decodeJwtRole(authToken));
    const nextUser = {
      ...userData,
      role: normalizeRole(userData.role) || roleFromToken || "User",
    };

    if (authToken) {
      sessionStorage.setItem("nf_token", authToken);
      setToken(authToken);
    } else {
      sessionStorage.removeItem("nf_token");
      setToken(null);
    }

    localStorage.setItem("nf_user", JSON.stringify(nextUser));
    setUser(nextUser);
  };

  const logout = () => {
    sessionStorage.removeItem("nf_token");
    localStorage.removeItem("nf_user");
    setToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({ user, token, login, logout }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}