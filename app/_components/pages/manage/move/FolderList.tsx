import { ChevronRight } from "lucide-react";
import type { WeekFolder } from "@/app/_lib/mock/manage-types";

type FolderListProps = {
  folders: WeekFolder[];
  onSelect: (folder: WeekFolder) => void;
};

export function FolderList({ folders, onSelect }: FolderListProps) {
  return (
    <div className="flex flex-col gap-2">
      {folders.map((folder) => (
        <button
          key={folder.recordId}
          onClick={() => !folder.isCurrent && onSelect(folder)}
          disabled={folder.isCurrent}
          className={[
            "flex min-h-[44px] w-full items-center justify-between rounded-xl px-4 py-3 ring-1 transition-all duration-150",
            folder.isCurrent
              ? "cursor-not-allowed bg-muted/50 opacity-40 ring-foreground/5"
              : "bg-card ring-foreground/10 hover:bg-accent active:scale-[0.98]",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <span className="text-sm font-medium text-foreground">
            {folder.label}
          </span>
          {!folder.isCurrent && (
            <ChevronRight className="size-4 text-muted-foreground" />
          )}
          {folder.isCurrent && (
            <span className="text-xs text-muted-foreground">현재 폴더</span>
          )}
        </button>
      ))}
    </div>
  );
}
