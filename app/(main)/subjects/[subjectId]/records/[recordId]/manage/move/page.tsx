"use client";

import { use, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AppShell } from "@/app/_components/layout/AppShell";
import { toast } from "sonner";
import type { WeekFolder } from "@/app/_lib/mock/manage-types";
import { mockWeekFolders } from "@/app/_lib/mock/manage-data";
import { simulateMove } from "@/app/_lib/mock/manage-actions";

import { FolderList } from "@/app/_components/pages/manage/move/FolderList";
import { MoveConfirmDialog } from "@/app/_components/pages/manage/move/MoveConfirmDialog";

const recordToWeek: Record<string, number> = {
  "1": 1,
  "2": 2,
  "3": 3,
};

export default function MovePage({
  params,
}: {
  params: Promise<{ subjectId: string; recordId: string }>;
}) {
  const { subjectId, recordId } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();

  const fileIds = (searchParams.get("files") ?? "").split(",").filter(Boolean);
  const currentWeek = recordToWeek[recordId] ?? 1;

  const folders: WeekFolder[] = mockWeekFolders.map((f) => ({
    ...f,
    isCurrent: f.weekNumber === currentWeek,
  }));

  const [selectedFolder, setSelectedFolder] = useState<WeekFolder | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSelectFolder = useCallback((folder: WeekFolder) => {
    setSelectedFolder(folder);
    setDialogOpen(true);
  }, []);

  const handleConfirmMove = useCallback(async () => {
    if (!selectedFolder) return;

    const result = await simulateMove(fileIds, selectedFolder.weekNumber);

    setDialogOpen(false);

    if (result === "success") {
      toast.success("파일 이동이 완료되었습니다.");
      setTimeout(() => {
        router.push(`/subjects/${subjectId}/records/${recordId}/manage`);
      }, 500);
    } else {
      toast.error("파일 이동 중 오류가 발생하였습니다!");
    }
  }, [selectedFolder, fileIds, router, subjectId, recordId]);

  return (
    <AppShell title="파일 이동" showBack>
      <div className="flex flex-col gap-4 p-4">
        <p className="text-xs text-muted-foreground">
          {fileIds.length}개 파일을 이동할 폴더를 선택하세요
        </p>
        <FolderList folders={folders} onSelect={handleSelectFolder} />
      </div>

      {selectedFolder && (
        <MoveConfirmDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          currentWeek={currentWeek}
          targetWeek={selectedFolder.weekNumber}
          onConfirm={handleConfirmMove}
        />
      )}
    </AppShell>
  );
}
