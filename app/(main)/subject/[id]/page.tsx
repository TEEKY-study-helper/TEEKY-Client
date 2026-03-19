"use client";

import { useState } from "react";
import { AppShell } from "@/app/_components/layout/AppShell";
import { ListItem } from "@/app/_components/sections/ListItem";
import { AddItemForm } from "@/app/_components/sections/AddItemForm";
import { FloatingAddButton } from "@/app/_components/buttons/FloatingAddButton";

const initialWeeks = [
  { id: "1", title: "1주차" },
  { id: "2", title: "2주차" },
  { id: "3", title: "3주차" },
];

export default function SubjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [weeks, setWeeks] = useState(initialWeeks);
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = (title: string) => {
    const newWeek = {
      id: String(Date.now()),
      title,
    };
    setWeeks((prev) => [...prev, newWeek]);
    setIsAdding(false);
  };

  return (
    <AppShell>
      <div className="flex flex-col">
        {weeks.map((week) => (
          <ListItem
            key={week.id}
            title={week.title}
            href={`#`}
          />
        ))}
        {isAdding && (
          <AddItemForm
            onSubmit={handleAdd}
            onCancel={() => setIsAdding(false)}
          />
        )}
      </div>
      {!isAdding && (
        <FloatingAddButton onClick={() => setIsAdding(true)} />
      )}
    </AppShell>
  );
}
