import type { PropsWithChildren } from "react";
import { Header } from "@/app/_components/layout/Header";
import { BottomNav } from "@/app/_components/layout/BottomNav";
import { cn } from "@/app/_lib/utils";

type AppShellProps = PropsWithChildren<{
  title?: string;
  showBack?: boolean;
  backHref?: string;
  className?: string;
}>;

export function AppShell({ children, title, showBack, backHref, className }: AppShellProps) {
  return (
    <div className="min-h-screen w-full bg-muted/50 flex justify-center">
      <div className="relative flex w-full max-w-[375px] min-h-screen flex-col bg-background shadow-xl shadow-black/5">
        <Header title={title} showBack={showBack} backHref={backHref} />
        <main className={cn("flex-1 overflow-y-auto pb-20", className)}>
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
