import { Bot, XCircle } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import type { UploadFile } from "@/app/_lib/mock/manage-types";
import { LearningFileItem } from "./LearningFileItem";

type LearningErrorViewProps = {
  files: UploadFile[];
  onRetry: () => void;
  onCancel: () => void;
};

export function LearningErrorView({
  files,
  onRetry,
  onCancel,
}: LearningErrorViewProps) {
  const errorFiles = files.filter((f) => f.learningStatus === "error");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-3 py-4">
        <div className="relative">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-destructive/10">
            <Bot className="size-8 text-destructive" />
          </div>
          <XCircle className="absolute -right-1 -bottom-1 size-6 text-destructive" />
        </div>
        <p className="text-center text-sm font-medium text-foreground">
          파일을 학습하는 중 오류가 발생했습니다
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {errorFiles.map((file) => (
          <LearningFileItem key={file.id} file={file} />
        ))}
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={onCancel}
          className="h-12 flex-1 rounded-xl text-base font-medium"
        >
          업로드 취소
        </Button>
        <Button
          onClick={onRetry}
          className="h-12 flex-1 rounded-xl text-base font-medium"
        >
          다시 시도
        </Button>
      </div>
    </div>
  );
}
