import { Loader2, Check } from "lucide-react";
import type { UploadFile } from "@/app/_lib/mock/manage-types";

type ProcessingFileItemProps = {
  file: UploadFile;
};

function truncateName(name: string, max: number = 20): string {
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

export function ProcessingFileItem({ file }: ProcessingFileItemProps) {
  const isCompleted = file.processingStatus === "completed";
  const isError = file.processingStatus === "error";

  const bgColor = isCompleted
    ? "bg-[#53BE4F]/10 ring-[#53BE4F]/20"
    : isError
      ? "bg-destructive/10 ring-destructive/20"
      : "bg-[#648AD7]/10 ring-[#648AD7]/20";

  const textColor = isCompleted
    ? "text-[#53BE4F]"
    : isError
      ? "text-destructive"
      : "text-[#648AD7]";

  return (
    <div
      className={`flex min-h-[44px] items-center justify-between rounded-xl px-4 py-3 ring-1 transition-all duration-300 ${bgColor}`}
    >
      <span className={`truncate text-sm font-medium ${textColor}`}>
        {truncateName(file.originalName)}
      </span>
      {isCompleted ? (
        <Check className="size-4 shrink-0 text-[#53BE4F]" />
      ) : isError ? (
        <span className="text-xs font-medium text-destructive">오류</span>
      ) : (
        <Loader2 className="size-4 shrink-0 animate-spin text-[#648AD7]" />
      )}
    </div>
  );
}
