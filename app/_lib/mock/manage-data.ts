import type { CompletedFile, WeekFolder } from "./manage-types";

export const mockCompletedFiles: CompletedFile[] = [
  {
    id: "1",
    name: "AA.pdf",
    originalName: "AA.pdf",
    type: "pdf",
    size: 1024000,
    uploadedAt: "2025-03-20T09:00:00Z",
    weekNumber: 2,
  },
  {
    id: "2",
    name: "BB.pdf",
    originalName: "BB.pdf",
    type: "pdf",
    size: 2048000,
    uploadedAt: "2025-03-21T10:30:00Z",
    weekNumber: 2,
  },
  {
    id: "3",
    name: "CC.pdf",
    originalName: "CC.pdf",
    type: "pdf",
    size: 512000,
    uploadedAt: "2025-03-22T14:00:00Z",
    weekNumber: 2,
  },
];

export const mockWeekFolders: WeekFolder[] = [
  { recordId: "rec-1", weekNumber: 1, label: "1주차", isCurrent: false },
  { recordId: "rec-2", weekNumber: 2, label: "2주차", isCurrent: true },
  { recordId: "rec-3", weekNumber: 3, label: "3주차", isCurrent: false },
];

export const mockCapacity = {
  usedBytes: 2_966_528,
  maxBytes: 1_610_612_736,
};
