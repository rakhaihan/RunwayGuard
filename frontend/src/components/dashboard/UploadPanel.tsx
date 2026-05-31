import { useCallback, useRef, useState } from 'react';
import { ImagePlus, Loader2, Scan, X } from 'lucide-react';
import clsx from 'clsx';

interface UploadPanelProps {
  onAnalyze: (file: File) => void;
  onReset: () => void;
  loading: boolean;
  error: string | null;
  hasResult: boolean;
}

const ACCEPT = ['image/jpeg', 'image/png', 'image/webp'];

export function UploadPanel({
  onAnalyze,
  onReset,
  loading,
  error,
  hasResult,
}: UploadPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFile = useCallback((file: File | undefined) => {
    if (!file) return;
    if (!ACCEPT.includes(file.type)) {
      return;
    }
    setSelectedFile(file);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      handleFile(e.dataTransfer.files[0]);
    },
    [handleFile],
  );

  const runAnalysis = () => {
    if (selectedFile) onAnalyze(selectedFile);
  };

  const clear = () => {
    setSelectedFile(null);
    if (inputRef.current) inputRef.current.value = '';
    onReset();
  };

  return (
    <section className="glass-panel p-5">
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
        Runway Image Upload
      </h2>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={clsx(
          'relative flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-8 transition-colors',
          dragOver
            ? 'border-signal-cyan bg-signal-cyan/5'
            : 'border-slate-600 bg-runway-800/40 hover:border-signal-cyan/50',
        )}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT.join(',')}
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        <ImagePlus className="mb-2 h-8 w-8 text-signal-cyan/80" aria-hidden />
        <p className="text-center text-sm font-medium text-slate-200">
          Drop runway image or click to browse
        </p>
        <p className="mt-1 text-center text-xs text-slate-500">JPEG, PNG, WebP</p>
      </div>

      {selectedFile && (
        <p className="mt-3 truncate font-mono text-xs text-slate-400">
          {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
        </p>
      )}

      {error && (
        <p className="mt-3 rounded-lg border border-signal-red/40 bg-signal-red/10 px-3 py-2 text-sm text-signal-red">
          {error}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={!selectedFile || loading}
          onClick={runAnalysis}
          className={clsx(
            'inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition',
            'bg-signal-cyan text-runway-950 hover:bg-signal-blue disabled:cursor-not-allowed disabled:opacity-40',
          )}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Analyzing…
            </>
          ) : (
            <>
              <Scan className="h-4 w-4" aria-hidden />
              Run FOD Scan
            </>
          )}
        </button>
        {(selectedFile || hasResult) && (
          <button
            type="button"
            onClick={clear}
            disabled={loading}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-600 px-3 py-2.5 text-sm text-slate-300 hover:border-slate-500 hover:bg-runway-800"
          >
            <X className="h-4 w-4" aria-hidden />
            Clear
          </button>
        )}
      </div>
    </section>
  );
}
