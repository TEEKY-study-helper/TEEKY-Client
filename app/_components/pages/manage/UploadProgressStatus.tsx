import { Upload } from "lucide-react";
import type { UploadFile } from "@/app/_lib/mock/manage-types";
import { ProcessingFileItem } from "./ProcessingFileItem";

type UploadProgressStatusProps = {
  files: UploadFile[];
};

export function UploadProgressStatus({ files }: UploadProgressStatusProps) {
  const completedCount = files.filter(
    (f) => f.processingStatus === "completed"
  ).length;
  const totalCount = files.length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-3 py-4">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-[#648AD7]/10">
          <Upload className="size-7 text-[#648AD7]" />
        </div>
        <p className="text-center text-sm font-medium text-foreground">
          파일을 업로드하는 중이에요
        </p>
        <p className="text-xs text-muted-foreground">
          {completedCount}/{totalCount} 완료
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {files.map((file) => (
          <ProcessingFileItem key={file.id} file={file} />
        ))}
      </div>
    </div>
  );
}
