import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/app/_lib/utils";

type ListItemProps = {
  title: string;
  href: string;
  subtitle?: string;
  className?: string;
};

export function ListItem({ title, href, subtitle, className }: ListItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-3 px-5 py-4 bg-card border-b border-border/50 transition-colors duration-150 active:bg-accent hover:bg-accent/50",
        className
      )}
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{title}</p>
        {subtitle && (
          <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
      <ChevronRight className="size-4 text-muted-foreground/60 transition-transform duration-150 group-hover:translate-x-0.5" />
    </Link>
  );
}
