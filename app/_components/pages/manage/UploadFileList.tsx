import type { UploadFile } from "@/app/_lib/mock/manage-types";
import { UploadFileItem } from "./UploadFileItem";

type UploadFileListProps = {
  files: UploadFile[];
  onRemove: (id: string) => void;
};

export function UploadFileList({ files, onRemove }: UploadFileListProps) {
  if (files.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      {files.map((file) => (
        <UploadFileItem key={file.id} file={file} onRemove={onRemove} />
      ))}
    </div>
  );
}
