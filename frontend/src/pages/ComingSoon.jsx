import { useState } from 'react';
import InfoModal from '../components/common/InfoModal.jsx';

export default function ComingSoon({ icon: Icon, title, description }) {
  const [notified, setNotified] = useState(false);

  return (
    <div>
      <div className="mb-6 flex items-start gap-3">
        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-primary/10 text-primary">
          <Icon size={19} />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white lg:text-2xl">{title}</h1>
        </div>
      </div>
      <div className="surface-card flex flex-col items-center justify-center gap-4 py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-[inset_0_0_0_1px_rgba(59,130,246,0.3)]">
          <Icon size={30} />
        </div>
        <h3 className="text-lg font-extrabold text-white">{title} is coming soon</h3>
        <p className="max-w-md text-sm leading-relaxed text-muted">{description}</p>
        <button className="btn-primary" onClick={() => setNotified(true)}>
          Notify me when it's ready
        </button>
      </div>
      <InfoModal
        open={notified}
        icon={Icon}
        title="You're on the list"
        description={`We'll let you know as soon as ${title} ships.`}
        onClose={() => setNotified(false)}
      />
    </div>
  );
}
