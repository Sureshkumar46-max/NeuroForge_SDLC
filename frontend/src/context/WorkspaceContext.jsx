import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { teams as defaultTeams, members as defaultMembers } from "../data/module2Data";
import { useAuth } from "./AuthContext";

const STORAGE_KEY = "nf_workspace_state";
const WorkspaceContext = createContext(null);

function loadSavedState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error("Failed to parse workspace state", error);
    return null;
  }
}

export function WorkspaceProvider({ children }) {
  const { user } = useAuth();
  const [state, setState] = useState(() => {
    const saved = loadSavedState();
    if (saved) return saved;

    return {
      organizations: [],
      teams: defaultTeams,
      members: defaultMembers,
      invites: [],
      currentOrgId: null,
    };
  });

  // Fetch real organizations from backend on mount
  useEffect(() => {
    const token = sessionStorage.getItem("nf_token");
    if (!token) return;

    axios
      .get("http://localhost:8080/api/orgs", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setState((prev) => ({ ...prev, organizations: res.data }));
      })
      .catch((err) => console.error("Failed to fetch orgs", err));
  }, []);

  // Once orgs are loaded, set currentOrgId from JWT's orgId
  // Set currentOrgId from JWT's orgId ONLY the first time (don't
  // override a manual org switch made via setCurrentOrg later)
  useEffect(() => {
    if (user?.orgId && state.currentOrgId == null) {
      setState((prev) => ({ ...prev, currentOrgId: user.orgId }));
    }
  }, [user?.orgId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const organizations = useMemo(() => state.organizations, [state.organizations]);
  const teams = useMemo(() => state.teams, [state.teams]);
  const members = useMemo(() => state.members, [state.members]);
  const invites = useMemo(() => state.invites, [state.invites]);
  const currentOrgId = state.currentOrgId;

  const currentOrg = useMemo(
    () => organizations.find((org) => org.id === currentOrgId) || organizations[0] || null,
    [organizations, currentOrgId]
  );

  const orgTeams = useMemo(
    () => teams.filter((team) => team.orgId === currentOrgId),
    [teams, currentOrgId]
  );

  const orgMembers = useMemo(
    () => members.filter((member) => member.orgId === currentOrgId),
    [members, currentOrgId]
  );

  const orgInvites = useMemo(
    () => invites.filter((invite) => invite.orgId === currentOrgId),
    [invites, currentOrgId]
  );

  const setCurrentOrg = (orgId) => {
    if (!orgId) return;
    setState((prev) => ({ ...prev, currentOrgId: orgId }));
  };

  // Calls the real backend instead of generating a local slug
  const createOrganization = async ({ name, description, industry, companySize }) => {
    const token = sessionStorage.getItem("nf_token");

    const response = await axios.post(
      "http://localhost:8080/api/orgs",
      { name, description, industry, companySize },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const newOrg = response.data;

    setState((prev) => ({
      ...prev,
      organizations: [...prev.organizations, newOrg],
      currentOrgId: newOrg.id,
    }));

    return newOrg;
  };

  const updateOrganization = (orgId, { name, description, industry, companySize }) => {
    setState((prev) => ({
      ...prev,
      organizations: prev.organizations.map((org) =>
        org.id === orgId
          ? { ...org, name, description, industry, companySize }
          : org
      ),
    }));
  };

  // Now calls the real backend DELETE endpoint
  const deleteOrganization = async (orgId) => {
    const token = sessionStorage.getItem("nf_token");

    await axios.delete(`http://localhost:8080/api/orgs/${orgId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setState((prev) => ({
      ...prev,
      organizations: prev.organizations.filter((org) => org.id !== orgId),
      teams: prev.teams.filter((team) => team.orgId !== orgId),
      members: prev.members.filter((member) => member.orgId !== orgId),
      currentOrgId: prev.currentOrgId === orgId ? (prev.organizations[0]?.id || null) : prev.currentOrgId,
    }));
  };

  const createTeam = async ({ name, description, lead }) => {
    const token = sessionStorage.getItem("nf_token");

    const response = await axios.post(
      `http://localhost:8080/api/orgs/${currentOrg.id}/teams`,
      { name, description, lead },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const backendTeam = response.data;
    const newTeam = { ...backendTeam, orgId: backendTeam.organizationId };

    setState((prev) => ({
      ...prev,
      teams: [...prev.teams, newTeam],
      organizations: prev.organizations.map((org) =>
        org.id === newTeam.orgId
          ? { ...org, teams: (org.teams || 0) + 1 }
          : org
      ),
    }));
    return newTeam;
  };

  const updateTeam = (teamId, { name, description, lead }) => {
    setState((prev) => ({
      ...prev,
      teams: prev.teams.map((team) =>
        team.id === teamId
          ? { ...team, name, description, lead }
          : team
      ),
    }));
  };

  const deleteTeam = (teamId) => {
    setState((prev) => {
      const team = prev.teams.find((t) => t.id === teamId);
      return {
        ...prev,
        teams: prev.teams.filter((t) => t.id !== teamId),
        organizations: prev.organizations.map((org) =>
          team && org.id === team.orgId
            ? { ...org, teams: Math.max(0, (org.teams || 0) - 1) }
            : org
        ),
      };
    });
  };

  const sendInvite = async ({ email, role, team }) => {
    const token = sessionStorage.getItem("nf_token");

    const selectedTeam = orgTeams.find((t) => t.name === team);

    if (!selectedTeam) {
      alert("Team not found");
      return;
    }

    const response = await axios.post(
      `http://localhost:8080/api/orgs/${currentOrg.id}/invites`,
      {
        email,
        role,
        teamId: selectedTeam.id,
        invitedBy: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  };

  const acceptInvite = async ({ token, name, password }) => {
    try {
      // Step 1: verify token with backend
      const verifyRes = await axios.get(
        `http://localhost:8080/api/invites/verify?token=${token}`
      );

      if (!verifyRes.data.valid) {
        return null;
      }

      // Step 2: accept invite on backend
      const acceptRes = await axios.post(
        `http://localhost:8080/api/invites/accept`,
        { token, name, password },
        { headers: { "Content-Type": "application/json" } }
      );

      return acceptRes.data; // { message: "Invite accepted, account created" }
    } catch (err) {
      console.error("Accept invite failed:", err);
      return null;
    }
  };

  return (
    <WorkspaceContext.Provider
      value={{
        organizations,
        teams,
        members,
        invites,
        currentOrg,
        currentOrgId,
        orgTeams,
        orgMembers,
        orgInvites,
        setCurrentOrg,
        createOrganization,
        createTeam,
        sendInvite,
        acceptInvite,
        updateOrganization,
        deleteOrganization,
        updateTeam,
        deleteTeam,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error("useWorkspace must be used within WorkspaceProvider");
  return ctx;
}