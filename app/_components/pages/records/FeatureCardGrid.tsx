import Link from "next/link";
import {
  FileText,
  BookOpen,
  FolderOpen,
  CircleX,
  Bookmark,
} from "lucide-react";
import { cn } from "@/app/_lib/utils";

type FeatureCard = {
  label: string;
  icon: React.ReactNode;
  color: string;
  href?: string;
};

type FeatureCardGridProps = {
  subjectId: string;
  recordId: string;
};

function getTopCards(): FeatureCard[] {
  return [
    {
      label: "문제풀기",
      icon: <FileText className="size-6" />,
      color: "bg-primary/10 text-primary",
    },
    {
      label: "요약노트",
      icon: <BookOpen className="size-6" />,
      color: "bg-chart-2/15 text-chart-2",
    },
  ];
}

function getBottomCards(subjectId: string, recordId: string): FeatureCard[] {
  return [
    {
      label: "파일관리",
      icon: <FolderOpen className="size-5" />,
      color: "bg-chart-3/15 text-chart-3",
      href: `/subjects/${subjectId}/records/${recordId}/manage`,
    },
    {
      label: "오답노트",
      icon: <CircleX className="size-5" />,
      color: "bg-destructive/10 text-destructive",
    },
    {
      label: "북마크",
      icon: <Bookmark className="size-5" />,
      color: "bg-chart-4/15 text-chart-4",
    },
  ];
}

function FeatureCardItem({
  card,
  size,
}: {
  card: FeatureCard;
  size: "lg" | "sm";
}) {
  const content = (
    <>
      <div
        className={cn(
          "flex items-center justify-center rounded-lg",
          card.color,
          size === "lg" ? "size-11" : "size-9"
        )}
      >
        {card.icon}
      </div>
      <span
        className={cn(
          "font-medium text-foreground",
          size === "lg" ? "text-sm" : "text-xs"
        )}
      >
        {card.label}
      </span>
    </>
  );

  const className = cn(
    "flex flex-col items-center justify-center gap-2 rounded-xl bg-card ring-1 ring-foreground/10 transition-all duration-150 active:scale-[0.97] hover:ring-foreground/20 hover:shadow-sm",
    size === "lg" ? "py-6" : "py-4"
  );

  if (card.href) {
    return (
      <Link href={card.href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button className={className}>
      {content}
    </button>
  );
}

export function FeatureCardGrid({ subjectId, recordId }: FeatureCardGridProps) {
  const topCards = getTopCards();
  const bottomCards = getBottomCards(subjectId, recordId);

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-2">
        {topCards.map((card) => (
          <FeatureCardItem key={card.label} card={card} size="lg" />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {bottomCards.map((card) => (
          <FeatureCardItem key={card.label} card={card} size="sm" />
        ))}
      </div>
    </div>
  );
}
