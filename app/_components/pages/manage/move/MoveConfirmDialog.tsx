"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";

type MoveConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentWeek: number;
  targetWeek: number;
  onConfirm: () => Promise<void>;
};

export function MoveConfirmDialog({
  open,
  onOpenChange,
  currentWeek,
  targetWeek,
  onConfirm,
}: MoveConfirmDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleConfirm() {
    setIsLoading(true);
    try {
      await onConfirm();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {currentWeek}주차 &gt; {targetWeek}주차
          </AlertDialogTitle>
          <AlertDialogDescription>
            컨텐츠를 이동하시겠어요?
            <br />
            현재 폴더의 파일이 삭제되고,
            <br />
            선택한 폴더에 파일이 추가됩니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>취소</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                이동 중...
              </>
            ) : (
              "이동"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
