import { Bot } from "lucide-react";
import type { UploadFile } from "@/app/_lib/mock/manage-types";
import { LearningFileItem } from "./LearningFileItem";

type AiLearningStatusProps = {
  files: UploadFile[];
};

export function AiLearningStatus({ files }: AiLearningStatusProps) {
  const completedCount = files.filter(
    (f) => f.learningStatus === "completed"
  ).length;
  const totalCount = files.length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-3 py-4">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-[#648AD7]/10">
          <Bot className="size-7 text-[#648AD7]" />
        </div>
        <p className="text-center text-sm font-medium text-foreground">
          인공지능이 업로드하신 파일을 학습하는 중이에요
        </p>
        <p className="text-xs text-muted-foreground">
          {completedCount}/{totalCount} 완료
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {files.map((file) => (
          <LearningFileItem key={file.id} file={file} />
        ))}
      </div>
    </div>
  );
}
