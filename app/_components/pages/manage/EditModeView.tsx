"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import type { CompletedFile } from "@/app/_lib/mock/manage-types";
import { SelectionCounter } from "./SelectionCounter";

type EditModeViewProps = {
  files: CompletedFile[];
  onCancel: () => void;
  onDelete: (fileIds: string[]) => void;
  onMoveNavigate: (fileIds: string[]) => void;
};

export function EditModeView({
  files,
  onCancel,
  onDelete,
  onMoveNavigate,
}: EditModeViewProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const selectedArray = Array.from(selectedIds);
  const hasSelection = selectedIds.size > 0;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-bold text-foreground">파일 관리</h3>
        <SelectionCounter selected={selectedIds.size} total={files.length} />
      </div>

      <div className="-mx-1 max-h-[260px] overflow-y-auto px-1 py-0.5">
        <div className="flex flex-col gap-2">
          {files.map((file) => {
            const isSelected = selectedIds.has(file.id);
            return (
              <button
                key={file.id}
                onClick={() => toggleSelect(file.id)}
                className={[
                  "flex min-h-[44px] w-full items-center gap-3 rounded-xl px-4 py-3 ring-1 transition-all duration-150",
                  isSelected
                    ? "bg-primary/5 ring-primary/30"
                    : "bg-card ring-foreground/10 hover:bg-accent",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div
                  className={[
                    "flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-150",
                    isSelected
                      ? "border-primary bg-primary"
                      : "border-muted-foreground/30",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {isSelected && <Check className="size-3 text-white" />}
                </div>
                <span className="truncate text-sm font-medium text-foreground">
                  {file.originalName.length > 20
                    ? file.originalName.slice(0, 17) + "..."
                    : file.originalName}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-2">
        <div className="flex gap-2">
          <AlertDialog>
            <AlertDialogTrigger
              disabled={!hasSelection}
              render={
                <Button
                  variant="destructive"
                  className="h-12 flex-1 rounded-xl text-base font-medium"
                  disabled={!hasSelection}
                />
              }
            >
              파일 삭제
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogTitle>파일 삭제</AlertDialogTitle>
                <AlertDialogDescription>
                  선택한 {selectedIds.size}개의 파일을 삭제하시겠습니까? 이 작업은
                  되돌릴 수 없습니다.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>취소</AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  onClick={() => onDelete(selectedArray)}
                >
                  삭제
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button
            variant="outline"
            disabled={!hasSelection}
            onClick={() => onMoveNavigate(selectedArray)}
            className="h-12 flex-1 rounded-xl text-base font-medium"
          >
            폴더 이동
          </Button>
        </div>

        <Button
          variant="ghost"
          onClick={onCancel}
          className="h-12 w-full rounded-xl text-base font-medium"
        >
          취소
        </Button>
      </div>
    </div>
  );
}
