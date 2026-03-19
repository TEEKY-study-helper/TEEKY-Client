import type { PropsWithChildren } from "react";
import { Header } from "@/app/_components/layout/Header";
import { BottomNav } from "@/app/_components/layout/BottomNav";

type AppShellProps = PropsWithChildren<{
  className?: string;
}>;

export function AppShell({ children, className }: AppShellProps) {
  const contentStyles = [
    "flex-1 overflow-y-auto",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="min-h-screen w-full bg-[#eeeeee] flex justify-center">
      <div className="relative flex w-full max-w-[375px] min-h-screen flex-col bg-[#d9d9d9]">
        <Header />
        <main className={contentStyles}>{children}</main>
        <div className="h-[68px] shrink-0" />
        <BottomNav />
      </div>
    </div>
  );
}
