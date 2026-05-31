import { Plane, Radio } from 'lucide-react';
import clsx from 'clsx';

interface HeaderProps {
  online: boolean;
  version?: string;
  detectorBackend?: string;
}

export function Header({ online, version, detectorBackend }: HeaderProps) {
  return (
    <header className="glass-panel relative overflow-hidden px-4 py-4 sm:px-6 sm:py-5">
      <div
        className="pointer-events-none absolute inset-0 bg-radar-grid bg-grid opacity-60"
        aria-hidden
      />
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-signal-cyan/30 bg-signal-cyan/10 shadow-glow">
            <Plane className="h-5 w-5 text-signal-cyan" aria-hidden />
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal-cyan/80">
              Boeing BUILD Indonesia
            </p>
            <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              RunwayGuard <span className="text-signal-cyan">AI</span>
            </h1>
            <p className="text-sm text-slate-400">
              Intelligent Runway FOD Detection System
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <div
            className={clsx(
              'flex items-center gap-2 rounded-full border px-3 py-1.5',
              online
                ? 'border-signal-green/40 bg-signal-green/10 text-signal-green'
                : 'border-signal-red/40 bg-signal-red/10 text-signal-red',
            )}
          >
            <Radio className="h-3.5 w-3.5" aria-hidden />
            <span>{online ? 'SYSTEM ONLINE' : 'OFFLINE'}</span>
            <span
              className={clsx(
                'h-2 w-2 rounded-full',
                online ? 'bg-signal-green status-pulse' : 'bg-signal-red',
              )}
            />
          </div>
          {version && (
            <span className="rounded-md border border-slate-700 bg-runway-800 px-2 py-1 text-slate-400">
              v{version}
            </span>
          )}
          {detectorBackend && (
            <span className="rounded-md border border-slate-700 bg-runway-800 px-2 py-1 uppercase text-slate-400">
              {detectorBackend}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
