"use client";

import { useState } from "react";

type AddItemFormProps = {
  onSubmit: (value: string) => void;
  onCancel: () => void;
  maxLength?: number;
  className?: string;
};

export function AddItemForm({
  onSubmit,
  onCancel,
  maxLength = 20,
  className,
}: AddItemFormProps) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (trimmed.length > 0) {
      onSubmit(trimmed);
      setValue("");
    }
  };

  const styles = [
    "flex items-center w-full h-[61px] px-4 bg-[#eeeeee] border-b border-black",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles}>
      <div className="flex items-center gap-2 flex-1">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            if (e.target.value.length <= maxLength) {
              setValue(e.target.value);
            }
          }}
          autoFocus
          className="bg-transparent border-b border-black text-[12px] text-black outline-none w-[130px] pb-1"
          placeholder=""
        />
        <span className="text-[8px] text-[#949494] font-light">
          {value.length}/{maxLength}
        </span>
      </div>
      <div className="flex items-center gap-1 text-[12px] font-semibold">
        <button
          type="button"
          onClick={onCancel}
          className="text-[#f54b38]/40 hover:text-[#f54b38]"
        >
          취소
        </button>
        <span className="text-black">|</span>
        <button
          type="button"
          onClick={handleSubmit}
          className="text-[#3877f5]"
        >
          완료
        </button>
      </div>
    </div>
  );
}
