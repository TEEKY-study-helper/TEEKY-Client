"use client";

import { use } from "react";
import { AppShell } from "@/app/_components/layout/AppShell";
import { FeatureCardGrid } from "@/app/_components/pages/records/FeatureCardGrid";
import { RecordContent } from "@/app/_components/pages/records/RecordContent";

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

export default function RecordDetailPage({
  params,
}: {
  params: Promise<{ subjectId: string; recordId: string }>;
}) {
  const { subjectId, recordId } = use(params);

  const subjectName = subjectNames[subjectId] ?? "과목";
  const recordTitle = recordNames[recordId] ?? `${recordId}주차`;
  const breadcrumb = `${subjectName} > ${recordTitle}`;

  return (
    <AppShell title={breadcrumb} showBack>
      <div className="flex flex-col gap-4 p-4">
        <FeatureCardGrid subjectId={subjectId} recordId={recordId} />
        <RecordContent />
      </div>
    </AppShell>
  );
}
