import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, UploadCloud, X } from 'lucide-react';
import PageHeader from '../../components/projects/PageHeader.jsx';
import Select from '../../components/common/Select.jsx';
import { organizations, teams, managers } from '../../data/mockData.js';
import { useProjects } from '../../context/ProjectsContext.jsx';
import { useWorkspace } from '../../context/WorkspaceContext.jsx';

const METHODOLOGIES = ['Agile', 'Scrum', 'Kanban', 'Waterfall'];
const PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];

export default function CreateProject() {
  const navigate = useNavigate();
  const { addProject } = useProjects();
  const { pushNotification } = useWorkspace();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [organization, setOrganization] = useState(organizations[0]);
  const [team, setTeam] = useState(teams[0]);
  const [manager, setManager] = useState(managers[0]);
  const [priority, setPriority] = useState(PRIORITIES[1]);
  const [methodology, setMethodology] = useState(METHODOLOGIES[0]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [techInput, setTechInput] = useState('');
  const [techStack, setTechStack] = useState(['React', 'Spring Boot']);
  const [logoName, setLogoName] = useState(null);

  const addTech = (e) => {
    e.preventDefault();
    const val = techInput.trim();
    if (val && !techStack.includes(val)) {
      setTechStack([...techStack, val]);
      setTechInput('');
    }
  };

  const removeTech = (t) => setTechStack(techStack.filter((x) => x !== t));

  const handleSubmit = (e) => {
    e.preventDefault();
    const created = addProject({
      name: name.trim() || 'Untitled Project',
      description,
      organization,
      team,
      manager,
      priority,
      methodology,
      startDate,
      endDate,
      techStack,
    });
    pushNotification(`Project Created — "${created.name}"`);
    navigate('/projects');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        icon={Rocket}
        title="Create Project"
        description="Set up a new project inside your organization's portfolio."
      />

      <form onSubmit={handleSubmit} className="surface-card space-y-7 p-6 lg:p-8">
        {/* Basics */}
        <section>
          <h3 className="mb-4 text-sm font-semibold text-white">Project Basics</h3>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="label-text">Project Name</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
                placeholder="e.g. NeuroBot AI Assistant"
              />
            </div>
            <div className="md:col-span-2">
              <label className="label-text">Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input-field resize-none"
                placeholder="Briefly describe the goal of this project…"
              />
            </div>
            <div>
              <label className="label-text">Organization</label>
              <Select value={organization} onChange={setOrganization} options={organizations} />
            </div>
            <div>
              <label className="label-text">Team</label>
              <Select value={team} onChange={setTeam} options={teams} />
            </div>
            <div>
              <label className="label-text">Project Manager</label>
              <Select value={manager} onChange={setManager} options={managers} />
            </div>
            <div>
              <label className="label-text">Priority</label>
              <Select value={priority} onChange={setPriority} options={PRIORITIES} />
            </div>
          </div>
        </section>

        {/* Methodology & Timeline */}
        <section className="border-t border-border pt-6">
          <h3 className="mb-4 text-sm font-semibold text-white">Methodology &amp; Timeline</h3>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <div>
              <label className="label-text">Methodology</label>
              <Select value={methodology} onChange={setMethodology} options={METHODOLOGIES} />
            </div>
            <div>
              <label className="label-text">Start Date</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="label-text">End Date</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="input-field" />
            </div>
          </div>
        </section>

        {/* Tech stack */}
        <section className="border-t border-border pt-6">
          <h3 className="mb-4 text-sm font-semibold text-white">Technology Stack</h3>
          <div className="mb-3 flex flex-wrap gap-2">
            {techStack.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
              >
                {t}
                <button type="button" onClick={() => removeTech(t)} className="text-primary/70 hover:text-white">
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="Add a technology and press Add…"
              className="input-field"
            />
            <button onClick={addTech} className="btn-secondary shrink-0">
              Add
            </button>
          </div>
        </section>

        {/* Logo upload */}
        <section className="border-t border-border pt-6">
          <h3 className="mb-4 text-sm font-semibold text-white">Project Logo</h3>
          <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border-strong bg-white/[0.02] py-8 text-center transition-colors hover:border-primary hover:bg-primary/5">
            <UploadCloud size={22} className="text-muted" />
            <p className="text-sm text-muted">
              {logoName ? logoName : 'Click to upload or drag and drop'}
            </p>
            <p className="text-[11px] text-muted/60">PNG or SVG, up to 2MB</p>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => setLogoName(e.target.files?.[0]?.name ?? null)}
            />
          </label>
        </section>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 border-t border-border pt-6">
          <button type="button" onClick={() => navigate('/projects')} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Save Project
          </button>
        </div>
      </form>
    </div>
  );
}
