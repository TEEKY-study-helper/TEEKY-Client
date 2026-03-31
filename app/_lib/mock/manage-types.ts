export interface UploadFile {
  id: string;
  file: File;
  name: string;
  originalName: string;
  size: number;
  uploadStatus: "pending" | "uploading" | "uploaded" | "error";
  learningStatus: "idle" | "learning" | "completed" | "error";
}

export interface CompletedFile {
  id: string;
  name: string;
  originalName: string;
  type: string;
  size: number;
  uploadedAt: string;
  weekNumber: number;
}

export interface WeekFolder {
  recordId: string;
  weekNumber: number;
  label: string;
  isCurrent: boolean;
}

export type ManagePageMode =
  | "idle"
  | "file-selected"
  | "uploading"
  | "learning"
  | "learn-success"
  | "learn-error"
  | "editing";
