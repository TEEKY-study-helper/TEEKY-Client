import type { CompletedFile } from "@/app/_lib/mock/manage-types";
import { CompletedFileItem } from "./CompletedFileItem";

type CompletedFileListProps = {
  files: CompletedFile[];
  onEdit: () => void;
  onFileTap: (file: CompletedFile) => void;
};

export function CompletedFileList({
  files,
  onEdit,
  onFileTap,
}: CompletedFileListProps) {
  if (files.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-bold text-foreground">
          업로드 완료 파일 목록
        </h3>
        <button
          onClick={onEdit}
          className="text-xs font-medium text-primary transition-colors hover:text-primary/80"
        >
          편집
        </button>
      </div>
      <div className="-mx-1 max-h-[176px] overflow-y-auto px-1 py-0.5">
        <div className="flex flex-col gap-2">
          {files.map((file) => (
            <CompletedFileItem key={file.id} file={file} onTap={onFileTap} />
          ))}
        </div>
      </div>
    </div>
  );
}
