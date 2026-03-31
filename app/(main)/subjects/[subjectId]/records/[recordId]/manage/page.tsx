"use client";

import { use, useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/app/_components/layout/AppShell";
import { Button } from "@/app/_components/ui/button";
import { toast } from "sonner";
import type {
  UploadFile,
  CompletedFile,
  ManagePageMode,
} from "@/app/_lib/mock/manage-types";
import {
  mockCompletedFiles,
  mockCapacity,
} from "@/app/_lib/mock/manage-data";
import {
  simulateUpload,
  simulateLearning,
  simulateDelete,
} from "@/app/_lib/mock/manage-actions";

import { CapacityIndicator } from "@/app/_components/pages/manage/CapacityIndicator";
import { FileUploadZone } from "@/app/_components/pages/manage/FileUploadZone";
import { UploadFileList } from "@/app/_components/pages/manage/UploadFileList";
import { AiLearningStatus } from "@/app/_components/pages/manage/AiLearningStatus";
import { LearningCompleteView } from "@/app/_components/pages/manage/LearningCompleteView";
import { LearningErrorView } from "@/app/_components/pages/manage/LearningErrorView";
import { CompletedFileList } from "@/app/_components/pages/manage/CompletedFileList";
import { EditModeView } from "@/app/_components/pages/manage/EditModeView";

const subjectNames: Record<string, string> = {
  "1": "데이터베이스",
  "2": "알고리즘",
  "3": "자료구조",
};

const recordNames: Record<string, string> = {
  "1": "1주차",
  "2": "2주차",
  "3": "3주차",
};

const MAX_FILES_PER_BATCH = 5;

export default function ManagePage({
  params,
}: {
  params: Promise<{ subjectId: string; recordId: string }>;
}) {
  const { subjectId, recordId } = use(params);
  const router = useRouter();

  const subjectName = subjectNames[subjectId] ?? "과목";
  const recordTitle = recordNames[recordId] ?? `${recordId}주차`;
  const breadcrumb = `${subjectName} > ${recordTitle}`;

  const [mode, setMode] = useState<ManagePageMode>("idle");
  const [completedFiles, setCompletedFiles] =
    useState<CompletedFile[]>(mockCompletedFiles);
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [capacity, setCapacity] = useState(mockCapacity);
  const uploadCheckRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (uploadCheckRef.current) clearInterval(uploadCheckRef.current);
    };
  }, []);

  const handleFilesSelected = useCallback(
    (files: File[]) => {
      const currentCount = uploadFiles.length;
      const remaining = MAX_FILES_PER_BATCH - currentCount;

      if (remaining <= 0) {
        toast.error(`최대 ${MAX_FILES_PER_BATCH}개까지 업로드할 수 있습니다.`);
        return;
      }

      const filesToAdd = files.slice(0, remaining);
      if (files.length > remaining) {
        toast.warning(
          `최대 ${MAX_FILES_PER_BATCH}개까지만 추가됩니다. ${files.length - remaining}개 파일이 제외되었습니다.`
        );
      }

      const newUploadFiles: UploadFile[] = filesToAdd.map((file, i) => ({
        id: `upload-${Date.now()}-${i}`,
        file,
        name: file.name,
        originalName: file.name,
        size: file.size,
        uploadStatus: "pending" as const,
        learningStatus: "idle" as const,
      }));

      setUploadFiles((prev) => [...prev, ...newUploadFiles]);
      setMode("uploading");

      // Simulate per-file upload
      newUploadFiles.forEach((uf) => {
        simulateUpload(uf.id).then((result) => {
          setUploadFiles((prev) =>
            prev.map((f) =>
              f.id === uf.id
                ? {
                    ...f,
                    uploadStatus: result === "success" ? "uploaded" : "error",
                  }
                : f
            )
          );
        });
      });

      // Check when all uploads are done
      if (uploadCheckRef.current) clearInterval(uploadCheckRef.current);
      uploadCheckRef.current = setInterval(() => {
        setUploadFiles((prev) => {
          if (prev.length === 0) {
            clearInterval(uploadCheckRef.current!);
            uploadCheckRef.current = null;
            return prev;
          }
          const allDone = prev.every(
            (f) => f.uploadStatus === "uploaded" || f.uploadStatus === "error"
          );
          if (allDone) {
            clearInterval(uploadCheckRef.current!);
            uploadCheckRef.current = null;
            setMode("file-selected");
          }
          return prev;
        });
      }, 300);
    },
    [uploadFiles.length]
  );

  const handleRemoveUploadFile = useCallback((id: string) => {
    setUploadFiles((prev) => {
      const next = prev.filter((f) => f.id !== id);
      if (next.length === 0) {
        setMode("idle");
      }
      return next;
    });
  }, []);

  const handleStartLearning = useCallback(() => {
    setMode("learning");
    setUploadFiles((prev) =>
      prev.map((f) => ({
        ...f,
        learningStatus:
          f.uploadStatus === "uploaded"
            ? ("learning" as const)
            : ("error" as const),
      }))
    );

    uploadFiles
      .filter((f) => f.uploadStatus === "uploaded")
      .forEach((uf) => {
        simulateLearning(uf.id).then((result) => {
          setUploadFiles((prev) => {
            const updated = prev.map((f) =>
              f.id === uf.id ? { ...f, learningStatus: result } : f
            );

            const allDone = updated.every(
              (f) =>
                f.learningStatus === "completed" ||
                f.learningStatus === "error"
            );

            if (allDone) {
              const hasError = updated.some(
                (f) => f.learningStatus === "error"
              );
              setTimeout(() => {
                setMode(hasError ? "learn-error" : "learn-success");
              }, 500);
            }

            return updated;
          });
        });
      });
  }, [uploadFiles]);

  const handleLearningComplete = useCallback(() => {
    const newCompleted: CompletedFile[] = uploadFiles
      .filter((f) => f.learningStatus === "completed")
      .map((f) => ({
        id: f.id,
        name: f.name,
        originalName: f.originalName,
        type: f.originalName.split(".").pop() ?? "unknown",
        size: f.size,
        uploadedAt: new Date().toISOString(),
        weekNumber: parseInt(recordId) || 1,
      }));

    setCompletedFiles((prev) => [...prev, ...newCompleted]);
    setCapacity((prev) => ({
      ...prev,
      usedBytes:
        prev.usedBytes + newCompleted.reduce((sum, f) => sum + f.size, 0),
    }));
    setUploadFiles([]);
    setMode("idle");
    toast.success("학습이 완료되었습니다.");
  }, [uploadFiles, recordId]);

  const handleRetryLearning = useCallback(() => {
    setUploadFiles((prev) =>
      prev.map((f) =>
        f.learningStatus === "error"
          ? { ...f, learningStatus: "learning" as const }
          : f
      )
    );
    setMode("learning");

    uploadFiles
      .filter((f) => f.learningStatus === "error")
      .forEach((uf) => {
        simulateLearning(uf.id).then((result) => {
          setUploadFiles((prev) => {
            const updated = prev.map((f) =>
              f.id === uf.id ? { ...f, learningStatus: result } : f
            );

            const allDone = updated.every(
              (f) =>
                f.learningStatus === "completed" ||
                f.learningStatus === "error"
            );

            if (allDone) {
              const hasError = updated.some(
                (f) => f.learningStatus === "error"
              );
              setTimeout(() => {
                setMode(hasError ? "learn-error" : "learn-success");
              }, 500);
            }

            return updated;
          });
        });
      });
  }, [uploadFiles]);

  const handleCancelUpload = useCallback(() => {
    setUploadFiles([]);
    setMode("idle");
  }, []);

  const handleDeleteFiles = useCallback(
    async (fileIds: string[]) => {
      await simulateDelete(fileIds);
      const deletedSet = new Set(fileIds);
      let deletedBytes = 0;
      setCompletedFiles((prev) => {
        const deletedFiles = prev.filter((f) => deletedSet.has(f.id));
        deletedBytes = deletedFiles.reduce((sum, f) => sum + f.size, 0);
        return prev.filter((f) => !deletedSet.has(f.id));
      });
      setCapacity((prev) => ({
        ...prev,
        usedBytes: prev.usedBytes - deletedBytes,
      }));
      setMode("idle");
      toast.success(`${fileIds.length}개 파일이 삭제되었습니다.`);
    },
    []
  );

  const handleMoveNavigate = useCallback(
    (fileIds: string[]) => {
      const params = new URLSearchParams();
      params.set("files", fileIds.join(","));
      router.push(
        `/subjects/${subjectId}/records/${recordId}/manage/move?${params.toString()}`
      );
    },
    [router, subjectId, recordId]
  );

  const handleFileTap = useCallback((file: CompletedFile) => {
    console.log("File tapped:", file);
  }, []);

  const hasUploadedFiles = uploadFiles.some(
    (f) => f.uploadStatus === "uploaded"
  );

  return (
    <AppShell title={breadcrumb} showBack>
      <div className="flex flex-col gap-4 p-4">
        <CapacityIndicator
          usedBytes={capacity.usedBytes}
          maxBytes={capacity.maxBytes}
        />

        {/* Idle: show completed files + upload zone */}
        {mode === "idle" && (
          <>
            <CompletedFileList
              files={completedFiles}
              onEdit={() => setMode("editing")}
              onFileTap={handleFileTap}
            />
            <FileUploadZone onFilesSelected={handleFilesSelected} />
          </>
        )}

        {/* File selected / Uploading */}
        {(mode === "file-selected" || mode === "uploading") && (
          <>
            {completedFiles.length > 0 && (
              <CompletedFileList
                files={completedFiles}
                onEdit={() => setMode("editing")}
                onFileTap={handleFileTap}
              />
            )}
            <UploadFileList
              files={uploadFiles}
              onRemove={handleRemoveUploadFile}
            />
            <FileUploadZone
              compact
              onFilesSelected={handleFilesSelected}
              maxFiles={MAX_FILES_PER_BATCH}
              currentFileCount={uploadFiles.length}
            />
            <Button
              onClick={handleStartLearning}
              disabled={!hasUploadedFiles || mode === "uploading"}
              className="h-12 w-full rounded-xl text-base font-medium"
            >
              인공지능 학습시키기
            </Button>
          </>
        )}

        {/* AI Learning in progress */}
        {mode === "learning" && <AiLearningStatus files={uploadFiles} />}

        {/* Learning complete */}
        {mode === "learn-success" && (
          <LearningCompleteView onComplete={handleLearningComplete} />
        )}

        {/* Learning error */}
        {mode === "learn-error" && (
          <LearningErrorView
            files={uploadFiles}
            onRetry={handleRetryLearning}
            onCancel={handleCancelUpload}
          />
        )}

        {/* Edit mode */}
        {mode === "editing" && (
          <EditModeView
            files={completedFiles}
            onCancel={() => setMode("idle")}
            onDelete={handleDeleteFiles}
            onMoveNavigate={handleMoveNavigate}
          />
        )}
      </div>
    </AppShell>
  );
}
