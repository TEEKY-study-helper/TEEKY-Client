import { ChevronRight } from "lucide-react";
import type { CompletedFile } from "@/app/_lib/mock/manage-types";

type CompletedFileItemProps = {
  file: CompletedFile;
  onTap: (file: CompletedFile) => void;
};

function truncateName(name: string, max: number = 20): string {
  if (name.length <= max) return name;
  return name.slice(0, max - 3) + "...";
}

export function CompletedFileItem({ file, onTap }: CompletedFileItemProps) {
  return (
    <button
      onClick={() => onTap(file)}
      className="flex min-h-[44px] w-full items-center justify-between rounded-xl bg-card px-4 py-3 ring-1 ring-foreground/10 transition-all duration-150 hover:bg-accent active:scale-[0.98]"
    >
      <span className="truncate text-sm font-medium text-foreground">
        {truncateName(file.originalName)}
      </span>
      <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
    </button>
  );
}
