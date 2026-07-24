import { Outlet } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';
import { useWorkspace } from '../context/WorkspaceContext.jsx';

function SignedOutOverlay() {
  const { signBackIn } = useWorkspace();
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-base/95 p-4 backdrop-blur-md animate-fade-in">
      <div className="surface-card w-full max-w-sm p-7 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent2 shadow-glow">
          <span className="text-lg font-extrabold text-white">N</span>
        </div>
        <h2 className="text-lg font-bold text-white">You've been signed out</h2>
        <p className="mt-2 text-sm text-muted">
          Your session has ended. Sign back in to continue working in NeuroForge.
        </p>
        <button onClick={signBackIn} className="btn-primary mt-6 w-full justify-center">
          <LogIn size={16} /> Sign Back In
        </button>
      </div>
    </div>
  );
}

export default function AppLayout() {
  const { collapsed, signedOut } = useWorkspace();

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
      {signedOut && <SignedOutOverlay />}
    </div>
  );
}
