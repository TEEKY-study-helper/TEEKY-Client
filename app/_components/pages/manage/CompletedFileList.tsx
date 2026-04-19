"use client";

import { useState, useEffect } from "react";
import { Check, Trash2, FolderInput } from "lucide-react";
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
import type { CompletedFile, ManagePageMode } from "@/app/_lib/mock/manage-types";
import { CompletedFileItem } from "./CompletedFileItem";
import { SelectionCounter } from "./SelectionCounter";

type CompletedFileListProps = {
  files: CompletedFile[];
  mode: ManagePageMode;
  onEdit: () => void;
  onFileTap: (file: CompletedFile) => void;
  // editing mode handlers
  onCancel: () => void;
  onDelete: (fileIds: string[]) => void;
  onMoveNavigate: (fileIds: string[]) => void;
};

export function CompletedFileList({
  files,
  mode,
  onEdit,
  onFileTap,
  onCancel,
  onDelete,
  onMoveNavigate,
}: CompletedFileListProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // editing 모드를 벗어날 때 선택 초기화
  useEffect(() => {
    if (mode !== "editing") {
      setSelectedIds(new Set());
    }
  }, [mode]);

  if (files.length === 0) return null;

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const isEditing = mode === "editing";
  const selectedArray = Array.from(selectedIds);
  const hasSelection = selectedIds.size > 0;

  return (
    <div className="flex flex-col gap-2">
      {/* 헤더: idle → 편집 버튼 / editing → 선택 카운터 */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-bold text-foreground">
          업로드 완료 파일 목록
        </h3>
        {isEditing ? (
          <SelectionCounter selected={selectedIds.size} total={files.length} />
        ) : (
          <button
            onClick={onEdit}
            className="-mx-2 inline-flex min-h-[44px] items-center px-2 text-xs font-medium text-primary transition-colors hover:text-primary/80"
          >
            편집
          </button>
        )}
      </div>

      {/* 파일 목록: idle → CompletedFileItem / editing → 선택 가능한 아이템 */}
      <div className="-mx-1 max-h-[310px] overflow-y-auto px-1 py-0.5">
        <div className="flex flex-col gap-2">
          {files.map((file, i) => {
            if (!isEditing) {
              return (
                <CompletedFileItem key={file.id} file={file} onTap={onFileTap} />
              );
            }

            const isSelected = selectedIds.has(file.id);
            return (
              <button
                key={file.id}
                onClick={() => toggleSelect(file.id)}
                aria-pressed={isSelected}
                style={{ animationDelay: `${i * 30}ms` }}
                className={[
                  "animate-in fade-in slide-in-from-left-1 flex min-h-[44px] w-full items-center gap-3 rounded-xl px-4 py-3 ring-1 transition-all duration-200",
                  isSelected
                    ? "bg-primary/5 ring-primary/30"
                    : "bg-card ring-foreground/10 active:scale-[0.98]",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {/* 선택 인디케이터 */}
                <div
                  className={[
                    "flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200",
                    isSelected
                      ? "border-primary bg-primary scale-110"
                      : "border-muted-foreground/30",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {isSelected && (
                    <Check className="animate-in zoom-in-50 size-3 text-white duration-150" />
                  )}
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

      {/* 편집 모드 액션 바: 슬라이드업 + 3열 한 라인 세그먼트 */}
      {isEditing && (
        <div className="animate-in slide-in-from-bottom-3 fade-in duration-200">
          <div className="flex h-12 overflow-hidden rounded-xl ring-1 ring-foreground/10">
            {/* 파일 삭제 — 선택 시 destructive 강조, 미선택 시 fade */}
            <AlertDialog>
              <AlertDialogTrigger
                disabled={!hasSelection}
                render={
                  <button
                    disabled={!hasSelection}
                    className={[
                      "flex flex-1 items-center justify-center gap-1.5 text-sm font-medium transition-colors duration-200",
                      hasSelection
                        ? "bg-destructive text-white active:brightness-90"
                        : "cursor-not-allowed bg-card text-muted-foreground/40",
                    ].join(" ")}
                  />
                }
              >
                <Trash2 className="size-[15px]" />
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

            <div className="w-px self-stretch bg-foreground/10" />

            {/* 폴더 이동 */}
            <button
              disabled={!hasSelection}
              onClick={() => onMoveNavigate(selectedArray)}
              className={[
                "flex flex-1 items-center justify-center gap-1.5 bg-card text-sm font-medium transition-colors duration-200",
                hasSelection
                  ? "text-foreground active:bg-accent"
                  : "cursor-not-allowed text-muted-foreground/40",
              ].join(" ")}
            >
              <FolderInput className="size-[15px]" />
              폴더 이동
            </button>

            <div className="w-px self-stretch bg-foreground/10" />

            {/* 취소 */}
            <button
              onClick={onCancel}
              className="flex flex-1 items-center justify-center bg-card text-sm font-medium text-muted-foreground transition-colors duration-200 active:bg-accent active:text-foreground"
            >
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
