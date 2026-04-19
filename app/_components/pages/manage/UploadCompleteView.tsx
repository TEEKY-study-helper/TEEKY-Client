import { Upload, CheckCircle2 } from "lucide-react";
import { Button } from "@/app/_components/ui/button";

type UploadCompleteViewProps = {
  onComplete: () => void;
};

export function UploadCompleteView({
  onComplete,
}: UploadCompleteViewProps) {
  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="relative">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-[#53BE4F]/10">
          <Upload className="size-8 text-[#53BE4F]" />
        </div>
        <CheckCircle2 className="absolute -right-1 -bottom-1 size-6 text-[#53BE4F]" />
      </div>
      <p className="text-center text-sm font-medium text-foreground">
        파일 업로드가 완료되었습니다
      </p>
      <Button
        onClick={onComplete}
        className="h-12 w-full rounded-xl text-base font-medium"
      >
        완료
      </Button>
    </div>
  );
}
