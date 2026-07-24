import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, Legend, BarChart, Bar,
} from 'recharts';
import { BarChart3, TrendingUp, Target, Activity } from 'lucide-react';
import PageHeader from '../../components/projects/PageHeader.jsx';
import { progressTrend, taskDistribution, healthByProject, activity, milestones } from '../../data/mockData.js';

const AXIS_COLOR = '#94A3B8';
const GRID_COLOR = 'rgba(59,130,246,0.12)';

function ChartCard({ title, icon: Icon, children }) {
  return (
    <div className="surface-card p-5">
      <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
        <Icon size={16} className="text-primary" /> {title}
      </h3>
      {children}
    </div>
  );
}

export default function ProjectAnalytics() {
  const upcoming = [...milestones].sort((a, b) => new Date(a.deadline) - new Date(b.deadline)).slice(0, 4);

  return (
    <div>
      <PageHeader
        icon={BarChart3}
        title="Project Analytics"
        description="Delivery trends, task distribution and portfolio health."
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ChartCard title="Project Progress" icon={TrendingUp}>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={progressTrend}>
              <CartesianGrid stroke={GRID_COLOR} vertical={false} />
              <XAxis dataKey="month" stroke={AXIS_COLOR} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke={AXIS_COLOR} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: '#111827', border: '1px solid rgba(59,130,246,0.25)', borderRadius: 10, fontSize: 12 }} />
              <Line type="monotone" dataKey="planned" stroke="#94A3B8" strokeWidth={2} dot={false} strokeDasharray="4 4" />
              <Line type="monotone" dataKey="completed" stroke="#3B82F6" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Task Distribution" icon={Activity}>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={taskDistribution} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
                {taskDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="#111827" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#111827', border: '1px solid rgba(59,130,246,0.25)', borderRadius: 10, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12, color: AXIS_COLOR }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Completion % by Project" icon={Target}>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={healthByProject} layout="vertical" margin={{ left: 8 }}>
              <CartesianGrid stroke={GRID_COLOR} horizontal={false} />
              <XAxis type="number" domain={[0, 100]} stroke={AXIS_COLOR} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis dataKey="name" type="category" stroke={AXIS_COLOR} fontSize={11} tickLine={false} axisLine={false} width={110} />
              <Tooltip contentStyle={{ background: '#111827', border: '1px solid rgba(59,130,246,0.25)', borderRadius: 10, fontSize: 12 }} />
              <Bar dataKey="health" radius={[0, 6, 6, 0]} fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Recent Activity" icon={Activity}>
          <div className="space-y-4">
            {activity.map((a) => (
              <div key={a.id} className="flex items-start gap-3 text-xs">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <div>
                  <p className="text-white">{a.text}</p>
                  <p className="mt-0.5 text-muted">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <div className="surface-card mt-5 p-5">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
          <Target size={16} className="text-primary" /> Upcoming Milestones
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {upcoming.map((m) => (
            <div key={m.id} className="rounded-lg border border-border bg-white/[0.03] p-3.5">
              <p className="truncate text-xs font-semibold text-white">{m.title}</p>
              <p className="mt-1 text-[11px] text-muted">{m.project}</p>
              <p className="mt-2 text-[11px] font-medium text-primary">Due {m.deadline}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
