import { Plus } from "lucide-react";
import { cn } from "@/app/_lib/utils";

type FloatingAddButtonProps = {
  onClick: () => void;
  className?: string;
};

export function FloatingAddButton({ onClick, className }: FloatingAddButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "fixed bottom-24 right-1/2 translate-x-[calc(375px/2-1rem)] size-14 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25 flex items-center justify-center transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-primary/30 active:scale-95",
        className
      )}
    >
      <Plus className="size-6" strokeWidth={2.5} />
    </button>
  );
}
