"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";
import { AppShell } from "@/app/_components/layout/AppShell";
import { ListItem } from "@/app/_components/sections/ListItem";
import { AddItemForm } from "@/app/_components/sections/AddItemForm";
import { EmptyState } from "@/app/_components/sections/EmptyState";
import { FloatingAddButton } from "@/app/_components/buttons/FloatingAddButton";

const initialSubjects = [
  { id: "1", title: "데이터베이스" },
  { id: "2", title: "알고리즘" },
  { id: "3", title: "자료구조" },
];

export default function Home() {
  const [subjects, setSubjects] = useState(initialSubjects);
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = (title: string) => {
    const newSubject = {
      id: String(Date.now()),
      title,
    };
    setSubjects((prev) => [...prev, newSubject]);
    setIsAdding(false);
  };

  return (
    <AppShell title="TEEKY">
      <div className="flex flex-col">
        {subjects.length === 0 && !isAdding ? (
          <EmptyState
            icon={<BookOpen className="size-12" />}
            title="등록된 과목이 없습니다"
            description="+ 버튼을 눌러 과목을 추가해보세요"
          />
        ) : (
          subjects.map((subject) => (
            <ListItem
              key={subject.id}
              title={subject.title}
              href={`/subject/${subject.id}`}
            />
          ))
        )}
        {isAdding && (
          <AddItemForm
            onSubmit={handleAdd}
            onCancel={() => setIsAdding(false)}
            placeholder="과목명을 입력하세요"
          />
        )}
      </div>
      {!isAdding && (
        <FloatingAddButton onClick={() => setIsAdding(true)} />
      )}
    </AppShell>
  );
}
