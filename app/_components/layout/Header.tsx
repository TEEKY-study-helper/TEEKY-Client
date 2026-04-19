"use client";

import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { cn } from "@/app/_lib/utils";

type HeaderProps = {
  title?: string;
  showBack?: boolean;
  backHref?: string;
  className?: string;
};

// 부모 경로가 자동 계산(마지막 세그먼트 제거)과 다를 때만 추가
// ex) /subjects/1 → /subjects 가 아닌 / 로 가야 하는 경우
const BACK_NAV_OVERRIDES: [pattern: string, parent: string][] = [
  ["subjects/:a",            "/"],
  ["subjects/:a/records/:b", "/subjects/:a"],
];

function matchPattern(pattern: string, segments: string[]): Record<string, string> | null {
  const patternSegs = pattern.split("/").filter(Boolean);
  if (patternSegs.length !== segments.length) return null;
  const params: Record<string, string> = {};
  for (let i = 0; i < patternSegs.length; i++) {
    if (patternSegs[i].startsWith(":")) {
      params[patternSegs[i].slice(1)] = segments[i];
    } else if (patternSegs[i] !== segments[i]) {
      return null;
    }
  }
  return params;
}

function deriveParentPath(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  for (const [pattern, parentTemplate] of BACK_NAV_OVERRIDES) {
    const params = matchPattern(pattern, segments);
    if (params) {
      return parentTemplate.replace(/:(\w+)/g, (_, key) => params[key] ?? "");
    }
  }
  if (segments.length <= 1) return "/";
  return "/" + segments.slice(0, -1).join("/");
}

export function Header({ title = "TEEKY", showBack = false, backHref, className }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleBack = () => {
    router.push(backHref ?? deriveParentPath(pathname));
  };

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
          onClick={handleBack}
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
