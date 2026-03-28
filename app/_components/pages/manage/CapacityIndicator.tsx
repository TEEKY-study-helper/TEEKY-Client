type CapacityIndicatorProps = {
  usedBytes: number;
  maxBytes: number;
};

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)}GB`;
}

export function CapacityIndicator({
  usedBytes,
  maxBytes,
}: CapacityIndicatorProps) {
  const percentage = Math.min((usedBytes / maxBytes) * 100, 100);

  return (
    <div className="flex items-center justify-between px-1">
      <span className="text-xs text-muted-foreground">
        업로드 가능 용량: {formatBytes(usedBytes)} / {formatBytes(maxBytes)}
      </span>
      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
