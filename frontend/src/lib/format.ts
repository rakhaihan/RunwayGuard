export function formatConfidence(value: number): string {
  return `${Math.round(value * 100)}%`;
}

export function formatMs(ms: number): string {
  return ms < 1000 ? `${ms.toFixed(0)} ms` : `${(ms / 1000).toFixed(2)} s`;
}

export function formatLabel(label: string): string {
  return label.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export function formatArea(px: number): string {
  return `${px.toLocaleString()} px²`;
}
