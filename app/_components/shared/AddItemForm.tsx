"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/app/_components/ui/button";
import { cn } from "@/app/_lib/utils";

type AddItemFormProps = {
  onSubmit: (value: string) => void;
  onCancel: () => void;
  maxLength?: number;
  placeholder?: string;
  className?: string;
};

export function AddItemForm({
  onSubmit,
  onCancel,
  maxLength = 20,
  placeholder = "이름을 입력하세요",
  className,
}: AddItemFormProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (trimmed.length > 0) {
      onSubmit(trimmed);
      setValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
    if (e.key === "Escape") onCancel();
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-5 py-3 bg-card border-b border-border/50 animate-in fade-in slide-in-from-top-1 duration-200",
        className
      )}
    >
      <div className="flex-1 flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => {
            if (e.target.value.length <= maxLength) {
              setValue(e.target.value);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 border-b-2 border-primary/30 focus:border-primary pb-1 outline-none transition-colors"
        />
        <span
          className={cn(
            "text-[10px] tabular-nums transition-colors",
            value.length >= maxLength
              ? "text-destructive"
              : "text-muted-foreground"
          )}
        >
          {value.length}/{maxLength}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="xs"
          onClick={onCancel}
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
        >
          취소
        </Button>
        <Button
          variant="ghost"
          size="xs"
          onClick={handleSubmit}
          className="text-primary font-semibold hover:bg-primary/10"
          disabled={value.trim().length === 0}
        >
          완료
        </Button>
      </div>
    </div>
  );
}
