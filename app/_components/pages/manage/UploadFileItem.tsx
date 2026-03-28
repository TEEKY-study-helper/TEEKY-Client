import { Loader2, X } from "lucide-react";
import type { UploadFile } from "@/app/_lib/mock/manage-types";

type UploadFileItemProps = {
  file: UploadFile;
  onRemove: (id: string) => void;
};

function truncateName(name: string, max: number = 15): string {
  if (name.length <= max) return name;
  const ext = name.lastIndexOf(".");
  if (ext > 0) {
    const base = name.slice(0, ext);
    const extension = name.slice(ext);
    const truncated = base.slice(0, max - 3 - extension.length);
    return `${truncated}...${extension}`;
  }
  return name.slice(0, max - 3) + "...";
}

export function UploadFileItem({ file, onRemove }: UploadFileItemProps) {
  const isUploading =
    file.uploadStatus === "pending" || file.uploadStatus === "uploading";

  return (
    <div className="flex min-h-[44px] items-center justify-between rounded-xl bg-card px-4 py-3 ring-1 ring-foreground/10 transition-all duration-200">
      <span className="truncate text-sm font-medium text-foreground">
        {truncateName(file.originalName)}
      </span>
      {isUploading ? (
        <Loader2 className="size-4 shrink-0 animate-spin text-muted-foreground" />
      ) : (
        <button
          onClick={() => onRemove(file.id)}
          className="flex size-6 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-muted"
        >
          <X className="size-4 text-muted-foreground" />
        </button>
      )}
    </div>
  );
}
