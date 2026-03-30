"use client";

import { useRef, useState } from "react";
import { Plus } from "lucide-react";

const ACCEPTED_TYPES = ".pdf,.doc,.docx,.ppt,.pptx";
const ACCEPTED_EXTENSIONS = ACCEPTED_TYPES.split(",");

type FileUploadZoneProps = {
  onFilesSelected: (files: File[]) => void;
  compact?: boolean;
  maxFiles?: number;
  currentFileCount?: number;
};

export function FileUploadZone({
  onFilesSelected,
  compact = false,
  maxFiles = 5,
  currentFileCount = 0,
}: FileUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleFiles(fileList: FileList | null) {
    if (!fileList) return;
    const remaining = Math.max(0, maxFiles - currentFileCount);
    const files = Array.from(fileList)
      .filter((file) =>
        ACCEPTED_EXTENSIONS.some((ext) =>
          file.name.toLowerCase().endsWith(ext),
        ),
      )
      .slice(0, remaining);
    if (files.length > 0) {
      onFilesSelected(files);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }

  if (compact) {
    return (
      <>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_TYPES}
          multiple
          className="hidden"
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <button
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={[
            "flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed py-3 text-sm font-medium transition-all duration-200",
            isDragging
              ? "border-primary bg-primary/5 text-primary"
              : "border-border text-muted-foreground hover:border-primary/50 hover:text-primary",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <Plus className="size-4" />
          추가 업로드
        </button>
      </>
    );
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES}
        multiple
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
      <button
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={[
          "flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed py-12 transition-all duration-200",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="flex size-14 items-center justify-center rounded-2xl bg-muted">
          <Plus className="size-7 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">
          파일을 업로드하여 공부를 시작해보세요!
        </p>
        <p className="text-xs text-muted-foreground/60">
          PDF, DOC, DOCX, PPT, PPTX
        </p>
      </button>
    </>
  );
}
