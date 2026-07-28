import { useState, useEffect } from "react";
import axios from "axios";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, Legend, BarChart, Bar,
} from "recharts";
import { TrendingUp, Target, Activity } from "lucide-react";
import WorkspaceLayout from "../../components/WorkspaceLayout";
import Card from "../../components/Card";
import { progressTrend, activity, milestones } from "../../data/mockData.js";
import { useAuth } from "../../context/AuthContext";

const AXIS_COLOR = "#94A3B8";
const GRID_COLOR = "rgba(59,130,246,0.12)";

function ProjectAnalytics() {
  const { token } = useAuth();
  const [taskDistribution, setTaskDistribution] = useState([]);
  const [healthByProject, setHealthByProject] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:8080/api/analytics/overview", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setTaskDistribution(res.data.taskDistribution || []);
        setHealthByProject(res.data.healthByProject || []);
      })
      .catch((err) => {
        console.error("Failed to fetch analytics overview", err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const upcoming = [...milestones].sort((a, b) => new Date(a.deadline) - new Date(b.deadline)).slice(0, 4);

  return (
    <WorkspaceLayout
      title="Project Analytics"
      subtitle="Delivery trends, task distribution and portfolio health."
      pageClassName="project-analytics-page"
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <Card title="Project Progress">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={progressTrend}>
              <CartesianGrid stroke={GRID_COLOR} vertical={false} />
              <XAxis dataKey="month" stroke={AXIS_COLOR} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke={AXIS_COLOR} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "#111827", border: "1px solid rgba(59,130,246,0.25)", borderRadius: 10, fontSize: 12 }} />
              <Line type="monotone" dataKey="planned" stroke="#94A3B8" strokeWidth={2} dot={false} strokeDasharray="4 4" />
              <Line type="monotone" dataKey="completed" stroke="#3B82F6" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Task Distribution">
          {loading ? (
            <p style={{ fontSize: 13, color: AXIS_COLOR }}>Loading...</p>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={taskDistribution} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
                  {taskDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} stroke="#111827" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "#111827", border: "1px solid rgba(59,130,246,0.25)", borderRadius: 10, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12, color: AXIS_COLOR }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Card>

        <Card title="Completion % by Project">
          {loading ? (
            <p style={{ fontSize: 13, color: AXIS_COLOR }}>Loading...</p>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={healthByProject} layout="vertical" margin={{ left: 8 }}>
                <CartesianGrid stroke={GRID_COLOR} horizontal={false} />
                <XAxis type="number" domain={[0, 100]} stroke={AXIS_COLOR} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke={AXIS_COLOR} fontSize={11} tickLine={false} axisLine={false} width={110} />
                <Tooltip contentStyle={{ background: "#111827", border: "1px solid rgba(59,130,246,0.25)", borderRadius: 10, fontSize: 12 }} />
                <Bar dataKey="health" radius={[0, 6, 6, 0]} fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>

        <Card title="Recent Activity">
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {activity.map((a) => (
              <div key={a.id} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13px" }}>
                <span style={{ marginTop: "5px", width: "6px", height: "6px", borderRadius: "50%", background: "var(--brand)", flexShrink: 0 }} />
                <div>
                  <p style={{ margin: 0 }}>{a.text}</p>
                  <p style={{ margin: 0, color: "var(--ink-soft)", fontSize: "11px" }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Card title="Upcoming Milestones">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px" }}>
            {upcoming.map((m) => (
              <div key={m.id} style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "14px", background: "rgba(255,255,255,0.03)" }}>
                <p style={{ fontSize: "13px", fontWeight: 600, margin: 0 }}>{m.title}</p>
                <p style={{ fontSize: "11px", color: "var(--ink-soft)", margin: "4px 0 0" }}>{m.project}</p>
                <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--brand)", margin: "8px 0 0" }}>Due {m.deadline}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </WorkspaceLayout>
  );
}

export default ProjectAnalytics;