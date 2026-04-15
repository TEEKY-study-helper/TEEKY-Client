import { Frown } from "lucide-react";
import { EmptyState } from "@/app/_components/shared/EmptyState";

export function RecordContent() {
  const hasFiles = false;

  if (!hasFiles) {
    return (
      <div className="mt-8">
        <EmptyState
          icon={<Frown className="size-16" />}
          title="문제를 생성하여"
          description="공부를 시작해보세요!"
        />
      </div>
    );
  }

  return null;
}
