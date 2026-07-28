import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';
import { useWorkspace } from '../context/WorkspaceContext.jsx';

export default function AppLayout() {
  const { collapsed } = useWorkspace();

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background:
          'radial-gradient(circle at top left, rgba(59,130,246,0.16), transparent 24%), linear-gradient(135deg, #060B18 0%, #0B1220 48%, #111827 100%)',
      }}
    >
      <Sidebar />
      <div
        className={`flex min-h-screen flex-col transition-all duration-300 ${
          collapsed ? 'ml-[76px]' : 'ml-[248px]'
        }`}
      >
        <Header />
        <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
