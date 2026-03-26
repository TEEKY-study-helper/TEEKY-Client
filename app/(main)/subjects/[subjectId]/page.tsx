"use client";

import { useState, use } from "react";
import { CalendarDays } from "lucide-react";
import { AppShell } from "@/app/_components/layout/AppShell";
import { ListItem } from "@/app/_components/shared/ListItem";
import { AddItemForm } from "@/app/_components/shared/AddItemForm";
import { EmptyState } from "@/app/_components/shared/EmptyState";
import { FloatingAddButton } from "@/app/_components/shared/FloatingAddButton";

const subjectNames: Record<string, string> = {
  "1": "데이터베이스",
  "2": "알고리즘",
  "3": "자료구조",
};

const initialWeeks = [
  { id: "1", title: "1주차" },
  { id: "2", title: "2주차" },
  { id: "3", title: "3주차" },
];

export default function SubjectDetailPage({
  params,
}: {
  params: Promise<{ subjectId: string }>;
}) {
  const { subjectId } = use(params);
  const [weeks, setWeeks] = useState(initialWeeks);
  const [isAdding, setIsAdding] = useState(false);

  const subjectName = subjectNames[subjectId] ?? "과목";

  const handleAdd = (title: string) => {
    const newWeek = {
      id: String(Date.now()),
      title,
    };
    setWeeks((prev) => [...prev, newWeek]);
    setIsAdding(false);
  };

  return (
    <AppShell title={subjectName} showBack>
      <div className="flex flex-col">
        {weeks.length === 0 && !isAdding ? (
          <EmptyState
            icon={<CalendarDays className="size-12" />}
            title="등록된 주차가 없습니다"
            description="+ 버튼을 눌러 주차를 추가해보세요"
          />
        ) : (
          weeks.map((week) => (
            <ListItem
              key={week.id}
              title={week.title}
              href={`/subjects/${subjectId}/records/${week.id}`}
            />
          ))
        )}
        {isAdding && (
          <AddItemForm
            onSubmit={handleAdd}
            onCancel={() => setIsAdding(false)}
            placeholder="주차명을 입력하세요"
          />
        )}
      </div>
      {!isAdding && (
        <FloatingAddButton onClick={() => setIsAdding(true)} />
      )}
    </AppShell>
  );
}
