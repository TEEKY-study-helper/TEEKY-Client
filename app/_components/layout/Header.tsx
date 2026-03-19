"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { cn } from "@/app/_lib/utils";

type HeaderProps = {
  title?: string;
  showBack?: boolean;
  className?: string;
};

export function Header({ title = "TEEKY", showBack = false, className }: HeaderProps) {
  const router = useRouter();

  return (
    <header
      className={cn(
        "sticky top-0 z-20 grid h-14 grid-cols-[40px_1fr_40px] items-center border-b border-border/50 bg-card/80 px-2 backdrop-blur-md",
        className
      )}
    >
      {showBack ? (
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => router.back()}
          className="text-foreground"
        >
          <ArrowLeft className="size-5" />
        </Button>
      ) : (
        <span />
      )}
      <h1 className="text-center text-base font-bold tracking-tight text-foreground truncate">
        {title}
      </h1>
      <span />
    </header>
  );
}
